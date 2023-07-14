import { Request, Response, NextFunction, Router } from 'express';
import { ItemService } from '../services/item.service';
import { getUserSession } from '../libs/context-session';
import { authenticateToken } from '../middlewares/auth.middleware';
import { ITEM_STATUS } from '../config';
import moment from 'moment';

export interface IItemResponse {
    item_id: number;
    item_name: string;
    current_price: number;
    expired_at: string;
    item_status: string;
}

export class ItemController {
    private readonly itemService: ItemService;
    private router: Router;

    constructor(itemService: ItemService) {
        this.itemService = itemService;
        this.router = Router();
        this.router.post('/', authenticateToken, this.addItem.bind(this));
        this.router.get('/', authenticateToken, this.getItems.bind(this));
        this.router.patch('/', authenticateToken, this.patchItems.bind(this));

    }

    getRouter(): Router {
        return this.router;
    }

    public async addItem(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { item_name, item_start_price, item_time_window } = req.body;
            const user = await getUserSession() as any;
            const item = await this.itemService
                .addItem({
                    itemName: item_name,
                    itemUserId: user.user_id,
                    itemStartPrice: item_start_price,
                    itemTimeWindow: item_time_window,
                    itemCreatedBy: user.user_id,
                    itemCreated: new Date(),
                    itemStatus: ITEM_STATUS.DRAFT
                });
            const response: IItemResponse = {
                item_id: item.itemId,
                item_name: item.itemName,
                current_price: item.itemEndPrice,
                expired_at: null,
                item_status: item.itemStatus
            }
            return res.status(201).json(response);
        } catch (err) {
            return next(err);
        }

    }
    public async getItems(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { item_status: itemStatus } = req.query;
            const items = await this.itemService.getAllItems(itemStatus as string);
            const data: IItemResponse[] = items.map(item => {
                const expiry = moment(item.itemPublishedAt).add(item.itemTimeWindow, 'hour').format();
                return {
                    item_id: item.itemId,
                    item_name: item.itemName,
                    current_price: item.itemEndPrice,
                    expired_at: expiry,
                    item_status: item.itemStatus
                }
            });
            return res.status(200).json({data})
        } catch (err) {
            return next(err);
        }
        
    }

    public async patchItems(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { item_id } = req.body;
            const [item, err] = await this.itemService.publishItem(item_id);
            if (err) {
                return next(err);
            }
            const expiry = moment(item.itemPublishedAt).add(item.itemTimeWindow, 'hour').format();
            const response: IItemResponse = {
                item_id: item.itemId,
                item_name: item.itemName,
                current_price: item.itemEndPrice,
                expired_at: expiry,
                item_status: item.itemStatus
            }
            return res.status(200).json(response);
        } catch (err) {
            return next(err);
        }
    }
}
