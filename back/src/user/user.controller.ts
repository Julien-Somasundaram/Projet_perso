import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    add(username: string,password : string): Promise<User> {
        if (!this.checkUsername(username)) {
            throw new Error("username incorrecte");
            
        }
        return this.userService.add(username,password);
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
    getLogin(username: string,password:string): Promise<Boolean> {
        return this.userService.getLogin(username,password);
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
