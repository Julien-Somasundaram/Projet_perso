<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from "vue";
import { AnimalService } from "../services/Animal/AnimalService";
import { Animal } from "../services/Animal/Animal";
import AnimalCard from "../components/animal_card.vue";

const count = ref(0)
const AN = new AnimalService();
const animaux = ref([Animal]);
defineProps<{
  boutique: boolean;
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
const Quantity = ref(0);
</script>

<template>
  <ul class="carousel">
    <li v-for="animal in animaux" :key="animal.id" class="card">
      <AnimalCard :animal="animal" :boutique="boutique" @compteur(Quantity) />
      <p>

        Quantité : {{ Quantity }}
      </p>

    </li>
  </ul>
</template>
