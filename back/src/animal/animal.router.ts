import { Router } from 'express';
import { AnimalController } from './animal.controller';


export class AnimalRouter {
    router = Router();

    constructor(private animalController: AnimalController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/:id', async (req, res, next) => {
            try {
                const result = await this.animalController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add-animal', async (req, res, next) => {
            try {
                const result = await this.animalController.add(req.body.nom,req.body.prix,req.body.valeur);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/',async  (req, res, next) => {
            try {
                const result = await this.animalController.getAll();
                
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

    }
}
