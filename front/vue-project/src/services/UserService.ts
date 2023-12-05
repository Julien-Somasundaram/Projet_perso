import axios from 'axios';
import { User } from '../services/User';

export class UserService{


    private ApiUrl = 'http://192.168.1.128:3000/api/user/';

    public getAll() {
        
        return axios.get(this.ApiUrl).then((response) => response.data);
    }
    public getById(id: number) {
        return axios.get(this.ApiUrl+"/id/"+id).then((response) => response.data);
    }
    public login(username:string,password:string) {
        return axios.post(this.ApiUrl+"/login", {username,password}).then((response) => response.data);
    }
    public register(username:string,password:string,role:string) {
        return axios.post(this.ApiUrl+"/add-user", {username,password,role}).then((response) => response.data);
    }
    public getAllRole() {
        return axios.get(this.ApiUrl+"/role").then((response) => response.data);
    }
    public setArgent(username:string,argent:number) {
        return axios.post(this.ApiUrl+"/argent", {username,argent}).then((response) => response.data);
    }
    

}