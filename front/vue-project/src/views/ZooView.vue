<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import { AnimalService } from "../services/Animal/AnimalService";
import { Animal } from "../services/Animal/Animal";

const AN = new AnimalService();
const animaux = ref([Animal]);

onMounted(async () => {
  try {
    animaux.value = await AN.getAll();
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
  }
});
</script>

<template>
  <main>
    <h1>Animaux:</h1>
    <ul>
      <li v-for="animal in animaux">
        {{ animal.nom }}, {{ animal.prix }}
      </li>
    </ul>
  </main>
</template>

<style>
</style>
