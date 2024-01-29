<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from "vue";
import { AnimalService } from "../services/Animal/AnimalService";
import { Animal } from "../services/Animal/Animal";
import AnimalCard from "../components/animal_card.vue";

const AN = new AnimalService();
const animaux = ref([Animal]);

const  props =defineProps<{
    boutique: boolean;
    zoo: any[];
  }>();
onMounted(async () => {
  try {

    animaux.value = await AN.getAll();
  } catch (error) {
    console.error("Erreur lors de la récupération des animaux :", error);
  }
});
function getImagePath(nom: string) {
  return "http://localhost:3000/api/animal/image/" + nom;
}

function getAnimalDispo(nom : string) {
  return getAnimalFromZoo(nom) ? "non_disponible" : "disponible";
}
function getAnimalFromZoo(nom: string) {
  for (let i = 0; i < props.zoo.length; i++) {
    if (props.zoo[i].nom === nom) {
      return props.zoo[i];
    }
  }
  return null;
}
const Quantity = ref(0);
</script>

<!-- <template>
  <ul class="carousel">
    <li v-for="animal in animaux" :key="animal.id" class="card">

      
      <AnimalCard :animal="animal" :quantity="0" :boutique="boutique" :disponible="getAnimalDispo(animal.nom)"  @click="$emit('click-card', animal)"/>
    </li>
  </ul>
</template> -->

<template>
  <v-sheet
    class="mx-auto"
  >
    <v-slide-group
      show-arrows
    >
      <v-slide-group-item
        v-for="animal in animaux"
        :key="animal.id"
      >
      <AnimalCard :animal="animal" :quantity="0" :boutique="boutique" :disponible="getAnimalDispo(animal.nom)"  @debloquer="$emit('debloquer', animal)"/>

      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<style scoped>



</style>
