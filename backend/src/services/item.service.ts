import { ITEM_STATUS } from '../config';
import { AppDataSource } from '../data-source';
import { Item } from '../typeorm/entities/item.entity';
import { ErrorCodes, StandardError } from '../libs/error';
import moment from 'moment';

export class ItemService {
  private itemRepository = AppDataSource.getRepository(Item);

  addItem(item: Partial<Item>): Promise<Item> {
    const newItem = this.itemRepository.create(item);
    return this.itemRepository.save(newItem);
  }

  getAllItems(itemStatus?: string, userId?: number): Promise<Item[]> {
    const where = [];
    if (itemStatus) {
      where.push({ itemStatus });
    }
    if (userId) {
      where.push(
        { itemCreatedBy: userId },
        { itemUserId: userId });
    }
    return this.itemRepository.find({ where, relations:{
      user: true,
      userCreatedBy: true
    } });
  }

  async publishItem(itemId: number): Promise<[Item, Error]> {
    const foundItem = await this.itemRepository.findOne({
      where: {
        itemId
      },
    });
    if (!foundItem) {
      return [null, new StandardError(ErrorCodes.ITEM_NOT_FOUND, 'Item Not Found', null, { itemId })]
    }
    foundItem.itemEndPrice = foundItem.itemStartPrice;
    foundItem.itemStatus = ITEM_STATUS.PUBLISHED;
    foundItem.itemPublishedAt = new Date();
    const expiry = moment(foundItem.itemPublishedAt).add(foundItem.itemTimeWindow, 'hour').toDate();
    foundItem.itemExpiredAt = expiry;
    const savedItem = await this.itemRepository.save(foundItem);
    return [savedItem, null];
  }
}
