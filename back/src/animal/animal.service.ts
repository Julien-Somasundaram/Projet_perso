import { Animal } from "./animal";

export interface AnimalService {
    add( nom: string, prix : number, valeur : number): Promise<Animal>;
    getById(id: number): Promise<Animal | null>;
    getAll(): Promise<Animal[]>;
    getZoo(username: string): Promise<any>;
    setQuantite(username: string, nom_animal: string, quantity: number): Promise<any>;
    addToZoo(username: string, nom_animal: string): Promise<any>;
    getAnimalImg(nom: string): any;
}