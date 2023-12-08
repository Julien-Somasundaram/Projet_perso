import { User } from './user';
import { UserService } from './user.service';
import { Role } from './role';

export class UserController {
    constructor(private userService: UserService) {}

    add(username: string,password : string,role : string): Promise<User> {
        if (!this.checkUsername(username)) {
            throw new Error("username incorrecte");
            
        }
        return this.userService.add(username,password,role);
    }

    getById(id: number):Promise<User | null> {
        if (!this.checkId(id)) {
            throw new Error("id incorrect");
               
        }
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
        return this.userService.setJour(username,jour);
    }

    checkUsername(username: string):boolean{
        if (username.length> 15) {
            return false;
        }
        if (username == null) {
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
