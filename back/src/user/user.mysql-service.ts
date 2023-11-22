import { User } from './user';
import { UserService } from './user.service';
import * as mysql from 'mysql';

export class UserMYSQLService implements UserService {
    private connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });
    
    add(username: string): Promise<User> {
    
        return new Promise((resolve, reject) => {
            const newUser = new User(0, username);
            const insertQuery = `INSERT INTO users (username) VALUES ('${username}')`;
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
            const selectQuery = `SELECT * FROM users WHERE id = ${id}`;
            this.connection.query(selectQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        const userData = results[0];
                        const user = new User(userData.id, userData.username);
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
            const selectAllQuery = `SELECT * FROM users`;
            this.connection.query(selectAllQuery, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results.map((userData: any) => {
                        return new User(userData.id, userData.username);
                    });
                    console.log(users);
                    resolve(users);
                }
            });
        });
    }


}
