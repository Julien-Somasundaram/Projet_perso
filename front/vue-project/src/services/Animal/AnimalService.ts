import axios from 'axios';

export class AnimalService{


    private ApiUrl = 'http://localhost:3000/api/animal/';

    public getAll() {
        
        return axios.get(this.ApiUrl).then((response) => response.data);
    }


}