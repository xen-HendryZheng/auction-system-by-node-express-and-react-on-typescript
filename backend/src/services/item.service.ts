import { ITEM_STATUS } from '../config';
import { AppDataSource } from '../data-source';
import { Item } from '../typeorm/entities/item.entity';
import { ErrorCodes, StandardError } from '../libs/error';

export class ItemService {
  private itemRepository = AppDataSource.getRepository(Item);

  addItem(item: Partial<Item>): Promise<Item> {
    const newItem = this.itemRepository.create(item);
    return this.itemRepository.save(newItem);
  }

  getAllItems(itemStatus?: string): Promise<Item[]> {
    if (itemStatus) {
      const where = {
        where: {
          itemStatus
        }
      }
      return this.itemRepository.find(where);
    }
    return this.itemRepository.find();
  }
  

  getOwnItems(itemCreatedBy: number): Promise<Item[]> {
    if (itemCreatedBy) {
      const where = {
        where: {
          itemCreatedBy
        }
      }
      return this.itemRepository.find(where);
    }
    return this.itemRepository.find();
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
    foundItem.itemStatus = ITEM_STATUS.PUBLISHED;
    foundItem.itemPublishedAt = new Date();
    const savedItem = await this.itemRepository.save(foundItem);
    return [savedItem, null];
  }
}
