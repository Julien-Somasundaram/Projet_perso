<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from "vue";
import { UserService } from "../services/UserService";
import { User } from "../services/User";
import Login from "../components/Login.vue";
import router from "@/router";
import { useVuelidate } from "@vuelidate/core";
import { Role } from "../services/Role";
import { AnimalService } from "@/services/Animal/AnimalService";
import Register from "../components/Register.vue";
import add_animal from "@/components/add_animal.vue";
import { Animal } from "../services/Animal/Animal";
import animaux_list_boutique  from "../components/animaux_list_boutique.vue";
import animaux_list_possede  from "../components/animaux_list_possede.vue";
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
 

</template>

<style>


</style>
