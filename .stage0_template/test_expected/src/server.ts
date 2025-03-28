import express from 'express';
import http from 'http';
import promBundle from 'express-prom-bundle'; 
import {Config, ConfigController, MongoIO} from '@agile-learning-institute/mentorhub-ts-api-utils';
import PartnerController from './controllers/PartnerController';
import TopicController from './controllers/TopicController';

export class Server {
    private config: Config;
    private mongoIO: MongoIO;
    private server?: http.Server;

    constructor() {
        this.config = Config.getInstance();
        this.mongoIO = MongoIO.getInstance();
        this.mongoIO.connect(this.config.PARTNERS_COLLECTION_NAME);
    }

    public async serve() {
        // Initialize express app
        const app = express();
        app.use(express.json());

        // Apply Prometheus monitoring middleware
        const metricsMiddleware = promBundle({
            includeMethod: true,
            metricsPath: '/api/health'
        });
        app.use(metricsMiddleware);

        // Create controllers, map routes
        const partnerController = new PartnerController();
        app.post('/api/partner/', (req, res) => partnerController.createPartner(req, res));
        app.get('/api/partner/', (req, res) => partnerController.getPartners(req, res));
        app.get('/api/partner/:partnerId', (req, res) => partnerController.getPartner(req, res));
        app.patch('/api/partner/:partnerId', (req, res) => partnerController.updatePartner(req, res));

        const topicController = new TopicController();
        app.get('/api/topic/', (req, res) => topicController.getTopic(req, res));

        // Map config to controllers
        const configController = new ConfigController();
        app.get('/api/config/', (req, res) => configController.getConfig(req, res));

        // Start Server
        const port = this.config.PARTNERS_API_PORT;
        this.server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        // Register exit handler
        console.log("Registering Exit Handler");
        process.on('exit', () => this.onExitHandler());
        process.on('SIGTERM', () => this.onExitHandler());
        process.on('SIGINT', () => this.onExitHandler());
        process.on('SIGUSR1', () => this.onExitHandler());
        process.on('SIGUSR2', () => this.onExitHandler());
        process.on('uncaughtException', () => this.onExitHandler());
    }

    private async onExitHandler() {
        console.log('Server is shutting down...');
        if (this.server) {
            this.server.close(() => {
                console.log('HTTP server closed.');
            });
        }
        await this.mongoIO.disconnect();
        console.log('MongoDB connection closed.');
        process.exit();
    }
}

// Start the server
(async () => {
    const server = new Server();
    await server.serve();
})();