import { AuthController } from "./controllers/auth.controller";
import { BidController } from "./controllers/bid.controller";
import { DepositController } from "./controllers/deposit.controller";
import { HealthcheckController } from "./controllers/healthcheck.controller";
import { ItemController } from "./controllers/item.controller";
import { AuthService } from "./services/auth.service";
import { BidService } from "./services/bid.service";
import { DepositService } from "./services/deposit.service";
import { ItemService } from "./services/item.service";

export async function init(): Promise<Record<string, any>> {

    // initialize service
    const authService = new AuthService();
    const itemService = new ItemService();
    const depositService = new DepositService();
    const bidService = new BidService();
    // Initialize controllers
    const authController = new AuthController(authService);
    const itemController = new ItemController(itemService);
    const healthcheckController = new HealthcheckController();
    const depositController = new DepositController(depositService);
    const bidController = new BidController(bidService);

    return { authController, itemController, healthcheckController, depositController, bidController };
}