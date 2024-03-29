import 'reflect-metadata';
import express, { Application } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as OpenApiValidator from 'express-openapi-validator';
import { init } from './init';
import { errorHandler } from './middlewares/handle-error';
import * as httpContext from 'express-http-context';
import cors from 'cors';

async function setupRoutes(app: Application) {
    const { authController, itemController, depositController, healthcheckController, bidController } = await init();
    app.use('/auth', authController.getRouter());
    app.use('/items', itemController.getRouter());
    app.use('/deposit', depositController.getRouter());
    app.use('/bid', bidController.getRouter())
    app.use('/healthcheck', healthcheckController.getRouter());

} 

export async function createApp(): Promise<Application> {
    const app = express();
    app.use(cors());
    app.use(httpContext.middleware);
    // Enable JSON body parsing
    app.use(express.json());
    // Load OpenAPI specification from YAML file
    const swaggerDocument = YAML.load('./docs/openapi.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // Initialize OpenAPI validator
    app.use(
        OpenApiValidator.middleware({
            apiSpec: './docs/openapi.yaml',
            validateRequests: true, // (default)
            validateResponses: true, // false by default
        }),
    );



    // Setup Routes
    await setupRoutes(app);

    // Error handler
    app.use(errorHandler());

    return app;
};
