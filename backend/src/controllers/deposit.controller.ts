import { Request, Response, NextFunction, Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { DepositService } from '../services/deposit.service';
import { getUserSession } from '../libs/context-session';

export class DepositController{
    private readonly depositService: DepositService;
    private router: Router;

    constructor(depositService: DepositService){
        this.depositService = depositService;
        this.router = Router();
        this.router.post('/', authenticateToken, this.depositAmount.bind(this))
    }

    getRouter(): Router{
        return this.router;
    }

    async depositAmount(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try {
            const { amount } = req.body;
            const user = await getUserSession() as any;
            const balance = await this.depositService.createDeposit({
                depositUserId: user.user_id,
                depositCredit: amount,
                depositDebit: 0
            });
            return res.status(200).json({balance});
        } catch (err) {
            return next(err);
        }
    }
}