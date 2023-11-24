import { Animal } from './animal';
import { AnimalService } from './animal.service';

export class AnimalController {
    constructor(private animalService: AnimalService) {}

    add(nom: string, prix : number, valeur : number): Promise<Animal> {
        if (!this.checkAnimalname(nom)) {
            throw new Error("username incorrecte");
            
        }
        return this.animalService.add(nom,prix,valeur);
    }

    getById(id: number):Promise<Animal | null> {
        if (!this.checkId(id)) {
            throw new Error("id incorrect");
               
        }
        return this.animalService.getById(id);
    }
    getAll(): Promise<Animal[]> {
        return this.animalService.getAll();
    }

    checkAnimalname(nom: string):boolean{
        if (nom.length> 15) {
            return false;
        }
        if (nom == null) {
            return false;
        }
        return true;
    }
    checkId(id: number):boolean{
        if (id < 0) {
            return false;
        }
     
        return true;
    }
}
