import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import http from 'http';
// import https from 'https';  // ❌ Not needed for now
import { UtilsService } from '../services/utils.service';
import { StripeService } from '../services/stripeAdn';

export class WebServerComponent {
    private app = express();
    private port: number;
    private router = express.Router();

    constructor(private utilsSvc: UtilsService, private stripeSvc: StripeService) {}

    async initWebServer(): Promise<void> {
        this.port = Number(this.utilsSvc.serverPort);

        // Apply middlewares
        this.setupMiddlewares();

        // Setup routes
        this.setRoutes();
        this.app.use('/', this.router);

        // Serve static files
        const temp = process.cwd();
        this.app.use(express.static(path.join(temp, './dist')));
        this.app.use(express.static(path.join(temp, './dist2')));

        // Catch-all for SPA routing (after static serving)
        this.app.get('/*', (req: Request, res: Response) => {
            res.sendFile(path.join(temp, './dist/index.html'));
        });

        // Start HTTP server directly
        http.createServer(this.app).listen(this.port, () => {
            console.log(`✅ HTTP server running on port ${this.port}`);
        });
    }

    private setupMiddlewares(): void {
        // CORS setup
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });

        // Body parsers
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private setRoutes(): void {
        this.utilsSvc.setRoutes(this.router);
        this.stripeSvc.setRoutes(this.router);
    }
}
