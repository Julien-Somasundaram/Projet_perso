import { Router } from 'express';
import { AnimalController } from './animal.controller';
import { UploadedFile } from 'express-fileupload';


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
                const file = req.files?.file as UploadedFile;
                console.log(file);
                // save file in data folder
                file.mv('./data/' + req.body.nom + ".jpg", function (err: any) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                });

                const result = await this.animalController.add(req.body.nom, req.body.prix, req.body.valeur);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/', async (req, res, next) => {
            try {
                const result = await this.animalController.getAll();

                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/zoo', async (req, res, next) => {
            try {
                const result = await this.animalController.getZoo(req.body.username);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/set-quantite', async (req, res, next) => {
            try {
                const result = await this.animalController.setQuantite(req.body.username, req.body.nom_animal, req.body.quantity);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/add-to-zoo', async (req, res, next) => {
            try {
                const result = await this.animalController.addToZoo(req.body.username, req.body.nom_animal);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/image/:nom', async (req, res, next) => {
            try {
                const result = this.animalController.getAnimalImg(req.params.nom);
                res.writeHead(200, {
                    'Content-Type': 'image/jpeg',
                    'Content-Length': result.length
                });
                res.end(result);
            } catch (error: unknown) {
                next(error);
            }
        });

    }
}
