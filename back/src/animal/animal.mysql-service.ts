import { Animal } from './animal';
import { AnimalService } from './animal.service';
import * as mysql from 'mysql';
import fs from 'fs';
export class AnimalMYSQLService implements AnimalService {
    private connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });
    
    add(nom : string, prix : number, valeur : number,popularite:number): Promise<Animal> {
        // save file
       
    
        return new Promise((resolve, reject) => {
            const newAnimal = new Animal(0, nom, prix, valeur,popularite);
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
                        const animal = new Animal(animalData.id, animalData.nom, animalData.prix, animalData.valeur,animalData.popularite);
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
             
                        return new Animal(animalData.id, animalData.nom, animalData.prix * 10, animalData.valeur,animalData.popularite);
                    });
                    resolve(animaux);
                }
            });
        });
    }
    getZoo(username: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const selectAllQuery = `SELECT users.username,animaux.nom,animaux.prix,animaux.valeur,quantite.quantity,animaux.popularite from users left join quantite ON users.id = quantite.id_user left join animaux on quantite.id_animal = animaux.id where users.username = '${username}' AND animaux.nom IS NOT NULL`;
            this.connection.query(selectAllQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const zoo: any[] = results.map((zooData: any) => {
                                                     
                            return {username : zooData.username, nom : zooData.nom, prix : zooData.prix , valeur : zooData.valeur, quantity : zooData.quantity, popularite : zooData.popularite};
                        }                                                       
                    ); 
                    resolve(zoo); }
            });
        });
        
    }
    setQuantite(username: string, nom_animal: string, quantity: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const insertQuery = `UPDATE quantite SET quantite.quantity =${quantity} WHERE quantite.id_user = (SELECT users.id from users where users.username = '${username}') AND quantite.id_animal = (SELECT animaux.id from animaux WHERE animaux.nom = '${nom_animal}')`;;
            this.connection.query(insertQuery, (error: mysql.MysqlError | null, results: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    addToZoo(username: string, nom_animal: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const insertQuery = `INSERT INTO quantite (id_user,id_animal,quantity) VALUES ((SELECT users.id from users where users.username = '${username}'),(SELECT animaux.id from animaux WHERE animaux.nom = '${nom_animal}'),1)`;;
            this.connection.query(insertQuery, (error: mysql.MysqlError | null, results: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    getAnimalImg(nom: string): any {
        const file_path = "./data/"+nom + '.jpg';
        const buffer = fs.readFileSync(file_path);
        return buffer;
    }




}
