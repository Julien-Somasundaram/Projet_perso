import axios from 'axios';
import { User } from '../services/User';

export class UserService{


    private ApiUrl = 'http://localhost:3000/api/user/';

    public getAll() {
        
        return axios.get(this.ApiUrl).then((response) => response.data);
    }
    

}