import { Bid } from '../typeorm/entities/bid.entity';
import { AppDataSource } from '../data-source';
import { Item } from '../typeorm/entities/item.entity';
import moment from 'moment';
import { ErrorCodes, StandardError } from '../libs/error';
import { ITEM_STATUS } from '../config';
import { User } from '../typeorm/entities/user.entity';
import { getUserSession } from '../libs/context-session';
import { DepositService } from './deposit.service';
import { LessThan, QueryRunner } from 'typeorm';

export class BidService {

  private readonly depositService: DepositService;
  private queryRunner: QueryRunner;

  constructor(depositService: DepositService) {
    this.depositService = depositService;
    this.queryRunner = AppDataSource.createQueryRunner();
  }

  private bidRepository = AppDataSource.getRepository(Bid);
  private itemRepository = AppDataSource.getRepository(Item);
  private userRepository = AppDataSource.getRepository(User);

  async checkBidAuction(): Promise<void> {
    // 1. Get list of published item and ended auction
    const publishedItem = await this.itemRepository.find({
      where: [
        { itemStatus: ITEM_STATUS.PUBLISHED, itemExpiredAt: LessThan(new Date()) },
      ]
    });
    if (!publishedItem.length) {
      console.log(`SKIPPED - No Published Item yet`)
      return;
    }
    console.log(`1. Get list of published item and ended auction, publishedItem.length=`, publishedItem.length)

    // 2. Loop each ended auction item
    console.log(`2. Loop each ended auction item`)
    publishedItem.map(async (item) => {
      item.itemStatus = ITEM_STATUS.CLOSED;
      await item.save();
      const bids = await this.bidRepository.find({
        where: [
          { bidItemId: item.itemId }
        ],
        order: {
          bidPrice: 'DESC'
        }
      });

      // 2.1 Get max bidder from bids list
      console.log(`2.1 Get max bidder and pop the record out from bids list`)

      const maxBidder = bids.length ? bids.shift() : undefined;

      // 2.2 Get other failed bidder and refund back their money
      console.log(`2.2 Get other failed bidder and refund back their money`)

      const otherFailedBidder = [...new Set(bids.map(p => p.bidUserId))].filter((b) => b !== maxBidder.bidUserId);

      if (bids.length) {
        otherFailedBidder.map(async (bidder) => {
          try {
            // 2.2.3 Get total deposit from failed bidder
            console.log(`2.2.3 Get total deposit from failed bidder`)

            const depositList = (await this.depositService.getDepositByUser(bidder, item.itemId)).map((deposit) => { return deposit.depositDebit });
            const sumDebitAmount: number = depositList.reduce((sum, debit) => {
              return Number(sum) + Number(debit);
            });

            // 2.2.3 Refund back the bidded amount to the failed bidder
            console.log(`2.2.3 Refund back the bidded amount to the failed bidder`)

            await this.depositService.createDeposit({
              depositUserId: bidder,
              depositCredit: sumDebitAmount,
              depositDebit: 0,
              depositDesc: `Refund back for lose auction for item ${item.itemId}-${item.itemName} `
            });
          } catch (err) {
            console.log(err);
          }

        });
      }

      // 2.3. Process winner bid
      console.log(`2.3. Process winner bid`)
      if (maxBidder) {
        const depositList = (await this.depositService.getDepositByUser(maxBidder.bidUserId, item.itemId)).map((deposit) => { return deposit.depositDebit });
        const sumDebitAmount: number = depositList.reduce((sum, debit) => {
          return Number(sum) + Number(debit);
        });
        try {
          await this.queryRunner.startTransaction();
          // 2.3.1. Return back original bid amount first before deduct the last amount from bid winner
          console.log(`2.3.1. Return back original bid amount first before deduct the last amount from bid winner`)
          await this.depositService.createDeposit({
            depositUserId: maxBidder.bidUserId,
            depositCredit: sumDebitAmount,
            depositDebit: 0,
            depositDesc: `Refund bid amount auction for item ${item.itemId}-${item.itemName} `
          });

          // 2.3.1. Deduct bid winner based on max bidded amount
          console.log(`2.3.1. Deduct bid winner based on max bidded amount`)
          await this.depositService.createDeposit({
            depositUserId: maxBidder.bidUserId,
            depositCredit: 0,
            depositDebit: maxBidder.bidPrice,
            depositDesc: `Deduct balance for winning auction for item ${item.itemId}-${item.itemName} `
          });

          // 2.3.2. Lastly Transfer item to the winner
          console.log(`2.3.2. Lastly Transfer item to the winner`, { item_id: item.itemId })
          item.itemUserId = maxBidder.bidUserId;
          await item.save();
          // commit transaction now:
          await this.queryRunner.commitTransaction();
        } catch (err) {
          await this.queryRunner.rollbackTransaction();
        } 
      }
    });

  }

  async getLastMaxBid(itemId: number): Promise<number> {
    const bid = await this.bidRepository.findOne({
      where: {
        bidItemId: itemId
      },
      order: {
        bidPrice: 'DESC'
      }
    });
    if (bid) return bid.bidPrice;
    else return 0;
  };

  async createBid(bidData: Partial<Bid>): Promise<Error> {


    const item = await this.itemRepository.findOne({
      where: {
        itemId: bidData.bidItemId,
        itemStatus: ITEM_STATUS.PUBLISHED
      },
    })
    if (!item) {
      return new StandardError(ErrorCodes.ITEM_NOT_FOUND, 'Item seems not published yet or time window has expired');
    }

    const { user_id } = await getUserSession();
    const user = await this.userRepository.findOne({
      where: {
        userId: user_id
      },
    });
    const userBalance = user.userBalance;
    if (userBalance < bidData.bidPrice) {
      return new StandardError(ErrorCodes.BALANCE_NOT_ENOUGH, null);
    }

    const expiry = moment(item.itemPublishedAt).add(item.itemTimeWindow, 'hour');


    if (moment().isBefore(expiry)) {
      let lastMaxBid = await this.getLastMaxBid(item.itemId);
      if (lastMaxBid === 0) {
        // If first time bid, get start price;
        lastMaxBid = Number(item.itemStartPrice);
      }

      if (lastMaxBid >= bidData.bidPrice) {
        return new StandardError(ErrorCodes.BID_TIME_OVER, `Your bid price is lower than the last bid price. Please put higher than $${lastMaxBid}`);
      }

      try {

        // Begin transaction to prevent race condition of same bid from multiple users
        await this.queryRunner.startTransaction();
        const lastBalance = await this.depositService.createDeposit({
          depositItemId: item.itemId,
          depositUserId: bidData.bidUserId,
          depositCredit: 0,
          depositDebit: bidData.bidPrice,
          depositDesc: `Temporary deposit for bid ${item.itemId} - ${item.itemName}`
        });

        console.log(`Successfully deposit ${item.itemId} for bid ${bidData.bidPrice}, last balance: ${lastBalance}`);

        const newBid = this.bidRepository.create(bidData);
        await this.bidRepository.save(newBid);

        item.itemEndPrice = newBid.bidPrice;
        await this.itemRepository.save(item);

        // commit transaction now:
        await this.queryRunner.commitTransaction()

        return null;

      } catch (err) {
        await this.queryRunner.rollbackTransaction()
      } 
    } else {
      return new StandardError(ErrorCodes.BID_TIME_OVER, null);
    }


  }


}
