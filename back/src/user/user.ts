export class User {
   constructor(
    public id: number,
    public username: string,
    public password: string,
    public role: string,
    public droit: number,
    public argent: number,
    public jour: number
   ){}
}