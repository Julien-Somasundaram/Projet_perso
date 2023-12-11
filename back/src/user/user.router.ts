import { Router } from 'express';
import { UserController } from './user.controller';


export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/id/:id', async (req, res, next) => {
            try {
                const result = await this.userController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add-user', async (req, res, next) => {
            try {
                const result = await this.userController.add(req.body.username,req.body.password,req.body.role);
                res.status(200).json(result);
            } catch (error: unknown) {
                console.log("error");

                next(error);
            }
        });
        this.router.get('/',async  (req, res, next) => {
            try {
                const result = await this.userController.getAll();
                
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/login', async (req, res, next) => {
            try {
                const result = await this.userController.getLogin(req.body.username,req.body.password);
                
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/role', async (req, res, next) => {
            try {
                const result = await this.userController.getAllRole();
                
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/argent', async (req, res, next) => {
            try {
                const result = await this.userController.setArgent(req.body.username,req.body.argent);
                
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/jour', async (req, res, next) => {
            try {
                const result = await this.userController.setJour(req.body.username,req.body.jour);
                
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
  
    }
}
