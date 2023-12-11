import { Router } from 'express';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserRouter } from '../user/user.router';
import { AnimalService } from '../animal/animal.service';
import { AnimalController } from '../animal/animal.controller';
import { AnimalRouter } from '../animal/animal.router';

export class ExpressRouter {
    router = Router();

    private userController!: UserController;
    private userRouter!: UserRouter;
    private animalController!: AnimalController;
    private animalRouter!: AnimalRouter;
    

    constructor(private userService: UserService,private animalService: AnimalService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.userController = new UserController(this.userService);
        this.animalController = new AnimalController(this.animalService);
    }

    private configureRouters(): void {
        this.userRouter = new UserRouter(this.userController);
        this.animalRouter = new AnimalRouter(this.animalController);
    }

    private configureRoutes(): void {
        this.router.use('/user', this.userRouter.router);
        this.router.use('/animal', this.animalRouter.router);
        this.router.use((err:Error, req:any, res:any, next:any) => {
            console.error(err.stack)
            res.status(400).send({"Error":err.message})
          })
    }
}
