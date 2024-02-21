import { User } from './user';
import { UserService } from './user.service';
import { Role } from './role';

export class UserController {
    constructor(private userService: UserService) {}

    add(username: string,password : string,role : string): Promise<User> {
        this.checkUsername(username); 
        this.checkPassword(password);
        return this.userService.add(username,password,role);
    }

    getById(id: number):Promise<User | null> {
        this.checkId(id);
        return this.userService.getById(id);
    }
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }
    getLogin(username: string,password:string): Promise<Boolean | User> {
        return this.userService.getLogin(username,password);
    }
    getAllRole(): Promise<Role[]> {
        return this.userService.getAllRole();
    }
    setArgent(username: string, argent: number): Promise<any> {
        return this.userService.setArgent(username,argent);
    }
    setJour(username: string, jour: number): Promise<any> {
        this.checkJour(jour);
        return this.userService.setJour(username,jour);
    }

    checkUsername(username: string):void{
        if (username.length> 20) {
            throw new Error("username trop long");
        }
        if (username == null) {
            throw new Error("username null");
                }
    }
    checkId(id: number):void{
        if (id < 0) {
            throw new Error("id negatif");
        }
    }
    checkPassword(password: string):void{
        if (password.length< 6) {
            throw new Error("password trop court");
        }
        if (password == null) {
            throw new Error("password null");
                }
        if (password.length> 20) {
            throw new Error("password trop long");
        }
    }
    checkJour(jour: number):void{
        if (jour < 0) {
            throw new Error("jour negatif");
        }
    }
}
