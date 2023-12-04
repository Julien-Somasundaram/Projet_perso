import express from 'express';
import cors from 'cors';
import { ExpressRouter } from './express-router';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

export class ExpressServer {
    private express = express();
    

    constructor(
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.express.use(cors());
        this.express.use(fileUpload());
        this.configureBodyParser();
        this.configureRoutes();
    }

    
    bootstrap(): void {
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }
    
    private configureBodyParser(): void {
        this.express.use(bodyParser.json());
    }
    private configureRoutes(): void {
        this.express.use('/api', this.expressRouter.router);
    }
}
