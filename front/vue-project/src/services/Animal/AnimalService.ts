import axios from 'axios';

export class AnimalService {


    private ApiUrl = 'http://192.168.1.128:3000/api/animal/';

    public getAll() {

        return axios.get(this.ApiUrl).then((response) => response.data);
    }

    public getZoo(username: string) {
        return axios.post(this.ApiUrl + "/zoo/", { username }).then((response) => response.data);
    }
    public setQuantite(username: string, nom_animal: string, quantity: number) {
        return axios.post(this.ApiUrl + "/set-quantite/", { username, nom_animal, quantity }).then((response) => response.data);
    }
    public addToZoo(username: string, nom_animal: string) {
        return axios.post(this.ApiUrl + "/add-to-zoo/", { username, nom_animal }).then((response) => response.data);
    }
    public add(nom: string, prix: number, valeur: number,popularite:number, file: File) {
        console.log(file);
        return axios.post(this.ApiUrl + "/add-animal/",
            { nom, prix, valeur, file },
            { headers: { 'Content-Type': 'multipart/form-data' } } 
        ).then((response) => response.data);
    }
    public getAnimalImg(nom: string) {
        console.log(this.ApiUrl + "/image/" + nom)
        return axios.get(this.ApiUrl + "/image/" + nom, { responseType: 'arraybuffer' })
          .then((response) => {
            console.log(response.data);
            const imageUrl = URL.createObjectURL(new Blob([response.data]));
            return imageUrl;
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération de l\'image :', error);
          });
      }
      


}