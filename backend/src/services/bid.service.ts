import { Bid } from '../typeorm/entities/bid.entity';
import { AppDataSource } from '../data-source';
import { Item } from '../typeorm/entities/item.entity';
import moment from 'moment';
import { ErrorCodes, StandardError } from '../libs/error';
import { ITEM_STATUS } from '../config';
import { User } from '../typeorm/entities/user.entity';
import { getUserSession } from '../libs/context-session';

export class BidService {
  private bidRepository = AppDataSource.getRepository(Bid);
  private itemRepository = AppDataSource.getRepository(Item);
  private userRepository = AppDataSource.getRepository(User);

  async createBid(bidData: Partial<Bid>): Promise<Error> {
    const item = await this.itemRepository.findOne({
      where: {
        itemId: bidData.bidItemId,
        itemStatus: ITEM_STATUS.PUBLISHED
      }
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
    if (userBalance < bidData.bidPrice){
      return new StandardError(ErrorCodes.BALANCE_NOT_ENOUGH, null);
    }

    const expiry = moment(item.itemPublishedAt).add(item.itemTimeWindow, 'hour');
    if (moment().isBefore(expiry)) {
      const newBid = this.bidRepository.create(bidData);
      await this.bidRepository.save(newBid);
      return null;
    } else {
      return new StandardError(ErrorCodes.BID_TIME_OVER, null);
    }

  }


}
