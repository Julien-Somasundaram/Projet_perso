import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';
import { UserMYSQLService } from '../user/user.mysql-service';
import { UserService } from '../user/user.service';
import { AnimalMYSQLService } from '../animal/animal.mysql-service';
import { AnimalService } from '../animal/animal.service';
import * as dotenv from 'dotenv';

export class ExpressApplication {
    private expressRouter!: ExpressRouter;
    private port!: string;
    private server!: ExpressServer;
    private userService!: UserService;
    private animalService!: AnimalService;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication(): void {
        this.configureEnvironment();
        this.configureServerPort();
        this.configureServices();
        this.configureExpressRouter();
        this.configureServer();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
        });
    }

    private configureServerPort(): void {
        this.port = this.getPort();
    }

    private configureServices(): void {
        this.userService = new UserMYSQLService();
        this.animalService = new AnimalMYSQLService();
    }

    private configureExpressRouter(): void {
        this.expressRouter = new ExpressRouter(this.userService,this.animalService);
    }

    private configureServer(): void {
        this.server = new ExpressServer(this.expressRouter, this.port);
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }
        return port;
    }
}
