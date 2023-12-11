import { Animal } from './animal';
import { AnimalService } from './animal.service';

export class AnimalController {
    constructor(private animalService: AnimalService) {}

    add(nom: string, prix : number, valeur : number,popularite : number): Promise<Animal> {
        this.checkAnimalname(nom);
        this.checkInt(prix);
        this.checkInt(valeur);
        this.checkInt(popularite);
        
        return this.animalService.add(nom,prix,valeur,popularite);
    }

    getById(id: number):Promise<Animal | null> {
        this.checkInt(id);
        return this.animalService.getById(id);
    }
    getAll(): Promise<Animal[]> {
        return this.animalService.getAll();
    }
    getZoo(username : string): Promise<any> {
        return this.animalService.getZoo(username);
    }
    setQuantite(username : string, nom_animal : string, quantity : number): Promise<any> {
        this.checkInt(quantity);
        return this.animalService.setQuantite(username,nom_animal,quantity);
    }
    addToZoo(username : string, nom_animal : string): Promise<any> {
        return this.animalService.addToZoo(username,nom_animal);
    }
    getAnimalImg(nom: string): any {
        return this.animalService.getAnimalImg(nom);
    }

    checkAnimalname(nom: string):void{
        if (nom.length> 15) {
            throw new Error("nom trop long");
        }
        if (nom == null) {
            throw new Error("nom null");
                }
        
    }
    checkInt(int: number):void{
        if (int < 0) {
            throw new Error("Int negatif");
        }
    }
    
}
