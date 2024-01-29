<script setup lang="ts">
import animaux_list_boutique  from "../components/animaux_list_boutique.vue";
import animaux_list_possede  from "../components/animaux_list_possede.vue";
import { ref, defineProps, onMounted, type Ref } from "vue";
import { AnimalService } from "../services/Animal/AnimalService";
import { Animal } from "../services/Animal/Animal";
import { UserService } from "../services/UserService";

const animal = ref(Animal);

const AN = new AnimalService();
const US = new UserService();
const animaux = ref([Animal]);
const zoo = ref([]);
let popularite: Ref<number> = ref(0);
let argent: Ref<number> = ref(0);
const user = JSON.parse(sessionStorage.getItem("user") ?? "null") as User;


onMounted(async () => {
  try {
    if (user) zoo.value = await AN.getZoo(user.username);
    updatePopularite();
    argent.value = user.argent;
    console.log("argent:", argent.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
});
function updatePopularite() {
  popularite.value = 0;
  for (let i = 0; i < zoo.value.length; i++) {
    popularite.value += zoo.value[i].popularite * zoo.value[i].quantity;
  }
}
async function acheter(nom_animal: string) {
  const animal = getAnimalFromZoo(nom_animal);

  if (animal) {
    if (argent.value >= animal.prix) {
      argent.value -= animal.prix;
      animal.quantity += 1;
      setQuantity(animal);
    } else {
      console.log("pas assez d'argent");
    }
  }
  updatePopularite();
  setArgent();
}
async function debloquer(nom_animal: string, animal_prix: number) {
  const animal = getAnimalFromZoo(nom_animal);

  if (animal) {
    alert("animal deja dans le zoo");
  } else {
    if (argent.value >= animal_prix) {
      argent.value -= animal_prix;
      addToZoo(nom_animal);
    } else {
      alert("pas assez d'argent");
    }
  }
  updatePopularite();
  setArgent();
}
async function setArgent() {
  // await US.setArgent(user.username, argent.value);
  user.argent = argent.value;
  sessionStorage.setItem("user", JSON.stringify(user));
}
async function setJour() {
  await US.setJour(user.username, user.jour);
}
async function setQuantity(animal: any) {
  await AN.setQuantite(user.username, animal.nom, animal.quantity);
}
async function addToZoo(nom_animal: string) {
  AN.addToZoo(user.username, nom_animal);
  // refresh zoo
  zoo.value = await AN.getZoo(user.username);
}
function startJourney() {
  for (let i = 0; i < zoo.value.length; i++) {
    argent.value += (zoo.value[i].popularite * zoo.value[i].quantity) / 10;
  }
  user.jour += 1;
  setJour();
  if (user.jour % 10 == 0) impot();
  console.log("upadte argent:", argent.value);
  setArgent();
  // update argent dans la base de donnée
}
function getAnimalFromZoo(nom: string) {
  for (let i = 0; i < zoo.value.length; i++) {
    if (zoo.value[i].nom == nom) return zoo.value[i];
  }
  return null;
}
function print(txt: string) {
  console.log(txt);
}
function impot() {
  argent.value -= user.jour * 30;
  setArgent();
}


</script>
<template>
  
  <div v-if="!user">
    <h1>Vous devez être connecté pour voir les animaux</h1>
    <router-link to="/login">Login</router-link>
  </div>
  <div v-else>
    <div class="d-flex align-center flex-column">
    <h1>
        Argent : {{ argent }}
      </h1>
      <h1>Popularité : {{ popularite }}</h1>
      <h1>Jour : {{ user.jour }}</h1>
      <v-btn  color="blue" @click="startJourney()">Démarrer la journée</v-btn>
      <h1>Mes Animaux :</h1>
    </div>
      <animaux_list_possede :zoo="zoo" :boutique="false" @acheter="acheter($event.nom)"/>
      <h1>Les animaux disponibles :</h1>
      <animaux_list_boutique :zoo="zoo" :boutique="true" @debloquer="debloquer($event.nom,$event.prix)"/>
    </div>

</template>
<!-- 
<style>

/* Styles pour les écrans jusqu'à 768px de largeur */
@media screen and (max-width: 768px) {
  .carousel {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    font-size: 16px;
  }
}

/* Styles pour les écrans plus larges que 768px */
@media screen and (min-width: 769px) {
  .carousel {
    width: 50%;
    overflow-x: auto;
    white-space: nowrap;
    font-size: 20px;
  }
}
.carousel li {
  scroll-snap-align: center;
  display: inline-block;
  border-radius: 3px;
}
/* Styles pour les cartes */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.6);
  transition: 0.3s;
  width: 200px;
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  background-color: rgb(28, 39, 28);
}
.card:hover {
  transform: scale(1.05);
}
.price {
  color: rgb(218, 200, 200);
  background-color: rgb(18, 26, 18);
  border-radius: 5px;
  display: flex;
  justify-content: center;
}
.price#image {
  width: 20px;
  height: 20px;
  object-fit: cover;
}
.popularite {
  color: rgb(218, 200, 200);
  font-size: 20px;
  background-color: rgb(18, 26, 18);
  border-radius: 5px;
  display: flex;
  justify-content: center;
}
.value {
  color: rgb(218, 200, 200);
  font-size: 20px;
  background-color: rgb(18, 26, 18);
  border-radius: 5px;
  display: flex;
  justify-content: center;
}
.card-body {
  padding: 10px;
  text-align: center;
}

.name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.animal-img {
  width: 150px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
}
#non_disponible {
  filter: grayscale(100%);
}

.price,
.quantity {
  font-size: 14px;
}
.zoo {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  gap: 10px;
}

</style> -->
