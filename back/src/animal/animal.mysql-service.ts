import { Animal } from './animal';
import { AnimalService } from './animal.service';
import * as mysql from 'mysql';

export class AnimalMYSQLService implements AnimalService {
    private connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });
    
    add(nom : string, prix : number, valeur : number): Promise<Animal> {
    
        return new Promise((resolve, reject) => {
            const newAnimal = new Animal(0, nom, prix, valeur);
            const insertQuery = `INSERT INTO animaux (nom,prix,valeur) VALUES ('${nom}','${prix}','${valeur}')`;
            this.connection.query(insertQuery, (error: mysql.MysqlError | null, results: any) => {
                if (error) {
                    reject(error);
                } else {
                    console.log('Animal added successfully');
                    newAnimal.id = results.insertId;
                    resolve(newAnimal);
                }
            });
        });
    }
    

    getById(id: number): Promise<Animal | null> {
        return new Promise((resolve, reject) => {
            const selectQuery = `SELECT * FROM animaux WHERE id = '${id}'`;
            this.connection.query(selectQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        const animalData = results[0];
                        const animal = new Animal(animalData.id, animalData.nom, animalData.prix, animalData.valeur);
                        resolve(animal);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    getAll(): Promise<Animal[]> {
        return new Promise((resolve, reject) => {
            const selectAllQuery = `SELECT * FROM animaux`;
            this.connection.query(selectAllQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const animaux: Animal[] = results.map((animalData: any) => {
                        return new Animal(animalData.id, animalData.nom, animalData.prix, animalData.valeur);
                    });
                    resolve(animaux);
                }
            });
        });
    }




}
