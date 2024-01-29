<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from "vue";
import { AnimalService } from "../services/Animal/AnimalService";
import { Animal } from "../services/Animal/Animal";
import AnimalCard from "../components/animal_card.vue";

const count = ref(0)
const AN = new AnimalService();
const animaux = ref([Animal]);
const props = defineProps<{
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
const Quantity = ref(0);
</script>



<template>
  <v-sheet
    class="mx-auto"
    

  >
    <v-slide-group
      show-arrows
    >
      <v-slide-group-item
        v-for="animal in props.zoo"
        :key="animal.id"
      >
      
      <AnimalCard :animal="animal" :boutique="props.boutique" :quantity="animal.quantity" disponible="disponible" @acheter="$emit('acheter', animal)"/>

      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>
