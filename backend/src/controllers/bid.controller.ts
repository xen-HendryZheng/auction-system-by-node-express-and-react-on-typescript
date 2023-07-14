import { Request, Response, NextFunction, Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { getUserSession } from '../libs/context-session';
import { BidService } from '../services/bid.service';

export class BidController{
    private readonly bidService: BidService;
    private router: Router;

    constructor(bidService: BidService){
        this.bidService = bidService;
        this.router = Router();
        this.router.post('/', authenticateToken, this.bidItem.bind(this))
    }

    getRouter(): Router{
        return this.router;
    }

    async bidItem(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try {
            const { bid_item_id, bid_price } = req.body;
            const user = await getUserSession() as any;
            const err = await this.bidService.createBid({
                bidItemId: bid_item_id,
                bidPrice: bid_price,
                bidUserId: user.user_id,
                bidCreated: new Date(),
                bidWinner: false,
            });
            if (err) return next(err);
            return res.status(201).send();
        } catch (err) {
            return next(err);
        }
    }
}