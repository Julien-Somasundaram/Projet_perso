import axios from 'axios';
import { User } from '../services/User';

export class UserService{


    private ApiUrl = 'http://localhost:3000/api/user/';

    public getAll() {
        
        return axios.get(this.ApiUrl).then((response) => response.data);
    }
    public login(username:string,password:string) {
        return axios.post(this.ApiUrl+"/login", {username,password}).then((response) => response.data);
    }
    public register(username:string,password:string) {
        return axios.post(this.ApiUrl+"/add-user", {username,password}).then((response) => response.data);
    }
    

}