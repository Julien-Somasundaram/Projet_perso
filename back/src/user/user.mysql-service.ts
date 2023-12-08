import { User } from './user';
import { UserService } from './user.service';
import * as mysql from 'mysql';
import { Role } from './role';


export class UserMYSQLService implements UserService {
    private connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        
    });
    
    
    add(username: string,password:string,role : string): Promise<User> {
        
        return new Promise(async (resolve, reject) => {
            const newUser = new User(0, username,password,role,0,0,1);
            const role_id = await this.getIdRole(role);
            const crypto = require('crypto');
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto.pbkdf2Sync(newUser.password, salt, 1000, 64, 'sha512').toString('hex');
            const cryp_pass = salt + '$' + hash;
            newUser.password = cryp_pass;
            const insertQuery = `INSERT INTO users( username, password, id_role) VALUES ('${username}','${cryp_pass}','${role_id}')`;
            this.connection.query(insertQuery, (error: mysql.MysqlError | null, results: any) => {
                if (error) {
                    reject(error);
                } else {
                    console.log('User added successfully');
                    newUser.id = results.insertId;
                    resolve(newUser);
                }
            });
        });
    }
    

    getById(id: number): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const selectQuery = `SELECT users.id, users.username,users.argent,users.password,role.nom, role.droit,users.jour FROM users LEFT JOIN role on users.id_role = role.id WHERE users.id ='${id}'`;
            this.connection.query(selectQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        const userData = results[0];
                        const user = new User(userData.id, userData.username, userData.password,userData.nom,userData.droit,userData.argent,userData.jour);
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    getAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            const selectAllQuery = `SELECT users.id, users.username,users.argent,users.password,role.nom, role.droit, users.jour FROM users LEFT JOIN role on users.id_role = role.id`;
            this.connection.query(selectAllQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results.map((userData: any) => {
                        return new User(userData.id, userData.username, userData.password,userData.nom,userData.droit,userData.argent,userData.jour);
                    });
                    resolve(users);
                }
            });
        });
    }

    getLogin(username: string,password: string): Promise<Boolean| User> {
        return new Promise((resolve, reject) => {
            const selectQuery = `SELECT users.id, users.username,users.argent,users.password,role.nom, role.droit , users.jour FROM users LEFT JOIN role on users.id_role = role.id WHERE username = '${username}'`;
            this.connection.query(selectQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        const userData = results[0];
                        const crypto = require('crypto');
                        const originalHash = userData.password.split('$')[1];
                        const salt = userData.password.split('$')[0];
                        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
                        password = salt + '$' + hash;
                        if (userData.password == password) {
                            const user = new User(userData.id, userData.username, userData.password,userData.nom,userData.droit,userData.argent,userData.jour);
                            resolve(user);
                        } else {
                            resolve(false);
                        }
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
    getAllRole(): Promise<Role[]> {
        return new Promise((resolve, reject) => {
            const selectQuery = `SELECT *  from role `;
            this.connection.query(selectQuery, (error, results) => {
                if (error) {
                    reject(error);
                } 
                else {
                    const roles: Role[] = results.map((roleData: any) => {
                        return new Role(roleData.id, roleData.nom,roleData.droit);
                    });
                    resolve(roles);
                }
            })
            });
    }
    getIdRole(role: string): Promise<number> {
        return new Promise((resolve, reject) => {
            const selectQuery = `SELECT role.id from role where role.nom ='${role}'`;
            this.connection.query(selectQuery, (error, results) => {
                if (error) {
                    reject(error);
                } 
                else {
                    const roles: Role[] = results.map((roleData: any) => {
                        return new Role(roleData.id, roleData.nom,roleData.droit);
                    });
                    resolve(roles[0].id);
                }
            })
            });
    }
    setArgent(username: string, argent: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const selectQuery = `UPDATE users SET argent = '${argent}' WHERE username = '${username}'`;
            this.connection.query(selectQuery, (error, results) => {
                if (error) {
                    reject(error);
                } 
                else {
                    resolve(results);
                }
            })
            });
    }
    setJour(username: string, jour: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const selectQuery = `UPDATE users SET jour = '${jour}' WHERE username = '${username}'`;
            this.connection.query(selectQuery, (error, results) => {
                if (error) {
                    reject(error);
                } 
                else {
                    resolve(results);
                }
            })
            });
    }


}
