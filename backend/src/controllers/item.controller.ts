import { Request, Response, NextFunction, Router } from 'express';
import { ItemService } from '../services/item.service';
import { getUserSession } from '../libs/context-session';
import { authenticateToken } from '../middlewares/auth.middleware';
import { ITEM_STATUS } from '../config';
import moment from 'moment';

export interface IItemResponse {
    item_id: number;
    item_name: string;
    start_price: number;
    current_price: number;
    time_window: string;
    expired_at: string;
    item_status: string;
    created_at?: string;
    created_by?: string;
    owned_by?: string;
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
                start_price: item.itemStartPrice,
                current_price: item.itemEndPrice,
                time_window: item.itemTimeWindow+' hour',
                created_at: moment(item.itemCreated).format(),
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
            const { item_status: itemStatus, own = '' } = req.query;
            const user = await getUserSession() as any;
            let items = [];
            let userId = own ? user.user_id : '';
            items = await this.itemService.getAllItems(itemStatus as string, userId);
            const data: IItemResponse[] = items.map(item => {
                return {
                    item_id: item.itemId,
                    item_name: item.itemName,
                    start_price: item.itemStartPrice,
                    current_price: item.itemEndPrice,
                    time_window: item.itemTimeWindow,
                    created_at: moment(item.itemCreated).format(),
                    expired_at: moment(item.itemExpiredAt).format(),
                    item_status: item.itemStatus,
                    created_by: item.userCreatedBy.userEmail,
                    owned_by: item.user.userEmail
                }
            });
            return res.status(200).json({ data })
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
            const response: IItemResponse = {
                item_id: item.itemId,
                item_name: item.itemName,
                start_price: item.itemStartPrice,
                current_price: item.itemEndPrice,
                time_window: item.itemTimeWindow,
                expired_at: moment(item.itemExpiredAt).format(),
                created_at: moment(item.itemCreated).format(),
                item_status: item.itemStatus
            }
            return res.status(200).json(response);
        } catch (err) {
            return next(err);
        }
    }
}
