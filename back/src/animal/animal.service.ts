import { Animal } from "./animal";

export interface AnimalService {
    add( nom: string, prix : number, valeur : number): Promise<Animal>;
    getById(id: number): Promise<Animal | null>;
    getAll(): Promise<Animal[]>;
}