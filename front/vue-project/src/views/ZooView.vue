<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import { AnimalService } from "../services/Animal/AnimalService";
import { Animal } from "../services/Animal/Animal";
import { UserService } from "../services/UserService";
import Header from "../components/Header.vue";

const AN = new AnimalService();
const US = new UserService();
const animaux = ref([Animal]);
const zoo = ref([]);
let popularite: Ref<number> = ref(0);
let argent: Ref<number> = ref(0);
const user = JSON.parse(localStorage.getItem("user") ?? "null") as string;

onMounted(async () => {
  try {
    animaux.value = await AN.getAll();
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
    }

  } else {
    addToZoo(nom_animal);
  }
  updatePopularite();
  setArgent();
}
async function setArgent() {
  await US.setArgent(user.username, argent.value);
  user.argent = argent.value;
  localStorage.setItem('user', JSON.stringify(user));
}
async function setQuantity(animal: any) {
  await AN.setQuantite(user.username, animal.nom, animal.quantity);
}
async function addToZoo(nom_animal: string) {
  AN.addToZoo(user.username, nom_animal);
}
function startJourney() {
  for (let i = 0; i < zoo.value.length; i++) {
    argent.value += (zoo.value[i].popularite * zoo.value[i].quantity) / 10;
  }
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
function getImagePath(nom: string) {
  return "http://localhost:3000/api/animal/image/" + nom;
}

</script>
<template>
  
  <main>
    <Header />
    <div v-if="!user">
      <h1>Vous devez être connecté pour voir les animaux</h1>
      <router-link to="/login">Login</router-link>
    </div>
    <div v-else>
      <h1>Argent : {{ argent }}</h1>
      <h1>Popularité : {{ popularite }}</h1>
      <h1>Mes Animaux :</h1>
      <div class="zoo">
        <div v-for="animal in zoo" :key="animal.id" class="card">
          <div class="card-body">
            <h2 class="name">{{ animal.nom }}</h2>
            <img :src="getImagePath(animal.nom)" class="animal-img" alt="">
            <p class="price">Prix : {{ animal.prix }}</p>
            <p class="quantity">Quantité : {{ animal.quantity }}</p>
            <button @click="acheter(animal.nom)">Acheter</button>

          </div>
        </div>
      </div>
      <button @click="startJourney()">Démarrer la journée</button>
      <h1>Les animaux disponibles :</h1>
      <ul>
        <li v-for="animal in animaux" :key="animal.id">
          {{ animal.nom }}, {{ animal.prix }}
          <button @click="acheter(animal.nom)">Acheter</button>
        </li>
      </ul>
    </div>
  </main>
</template>
<style>
 body {

    background-image: url("../assets/background.jpg");
    background-size: cover;
    margin: 150px;
    padding: 0;
    font-family: Arial, sans-serif;
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

  }
  .card:hover {
    transform: scale(1.05);
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

  .price,
  .quantity {
    font-size: 14px;
  }
  .zoo {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
</style>
