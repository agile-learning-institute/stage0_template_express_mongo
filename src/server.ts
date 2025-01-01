import express from 'express';
import http from 'http';
import promBundle from 'express-prom-bundle'; 
import {Config, ConfigController, MongoIO} from '@{{arch.organization}}/{{arch.product}}-ts-api-utils';
{% for source in service.data.sources -%}
import {{source.name}}Controller from './controllers/{{source.name}}Controller';
{% endfor %}
{% for source in service.data.sinks -%}
import {{source.name}}Controller from './controllers/{{source.name}}Controller';
{% endfor %}

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
        {% for source in service.data.sources -%}
        const {{source.name}}Controller = new {{source.name}}Controller();
        app.post('/api/{{source.name}}/', (req, res) => {{source.name}}Controller.create{{source.name}}(req, res));
        app.get('/api/{{source.name}}/', (req, res) => {{source.name}}Controller.get{{source.name}}s(req, res));
        app.get('/api/{{source.name}}/:{{source.name}}Id', (req, res) => {{source.name}}Controller.get{{source.name}}(req, res));
        app.patch('/api/{{source.name}}/:{{source.name}}Id', (req, res) => {{source.name}}Controller.update{{source.name}}(req, res));
        {% endfor %}

        {% for source in service.data.sinks -%}
        const {{source.name}}Controller = new {{source.name}}Controller();
        app.get('/api/{{source.name}}/', (req, res) => {{source.name}}Controller.get{{source.name}}(req, res));
        {% endfor %}

        // Map config to controllers
        const configController = new ConfigController();
        app.get('/api/config/', (req, res) => configController.getConfig(req, res));

        // Start Server
        const port = this.config.{{service.name}}_API_PORT;
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
