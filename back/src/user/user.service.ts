import { Role } from "./role";
import { User } from "./user";

export interface UserService {
    add( username: string,password:string,role : string): Promise<User>;
    getById(id: number): Promise<User | null>;
    getAll(): Promise<User[]>;
    getLogin(username: string,password:string): Promise<Boolean | User>;
    getAllRole(): Promise<Role[]>;
    setArgent(username: string, argent: number): Promise<any>;
}