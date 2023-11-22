import { User } from "./user";

export interface UserService {
    add( username: string): Promise<User>;
    getById(id: number): Promise<User | null>;
    getAll(): Promise<User[]>;
}