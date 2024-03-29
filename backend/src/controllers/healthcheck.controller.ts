/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, Router } from 'express';

export class HealthcheckController {

    private router: Router;
    constructor() {
        this.router = Router();
        this.router.get('/liveness', HealthcheckController.getHealthcheckLiveness);
        this.router.get('/readiness', HealthcheckController.getHealthcheckReadiness);
    }

    getRouter(): Router {
        return this.router;
    };

    static getHealthcheckLiveness(_: Request, res: Response) {
        res.status(200).json({ status: 'OK' });
    }

    static getHealthcheckReadiness(_: Request, res: Response) {
        res.status(200).json({ status: 'OK' });
    }
}
