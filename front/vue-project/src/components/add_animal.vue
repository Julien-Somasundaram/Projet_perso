<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from "vue";

import { AnimalService } from "@/services/Animal/AnimalService";

const AN = new AnimalService();



const nom_animal: Ref<string> = ref("");
const popularite: Ref<number> = ref(0);
const valeur: Ref<number> = ref(0);
const prix: Ref<number> = ref(0);
const file: Ref<File> = ref(new File([""], "filename"));


async function addAnimal(
 popularite: number,
   nom: string,
  prix: number,
  valeur: number,
  file: File
) {
  try {
    const response = await AN.add(nom, prix, valeur, popularite, file);
  } catch (error) {
    alert(error);
  }
}
</script>

<template>
  <div>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Nom :</div>

      <v-text-field
        v-model="nom_animal"
        density="compact"
        placeholder="Nom"
        variant="outlined"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Prix
      </div>

      <v-text-field
        v-model="prix"
        type="number"
        density="compact"
        placeholder="Prix"
        variant="outlined"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Valeur
      </div>

      <v-text-field
        v-model="valeur"
        type="number"
        density="compact"
        placeholder="Valeur"
        variant="outlined"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Popularité
      </div>

      <v-text-field
        v-model="popularite"
        type="number"
        density="compact"
        placeholder="Popularité"
        variant="outlined"
      ></v-text-field>
      <v-file-input label="Image" variant="solo" v-on:change="file = $event.target.files[0]"></v-file-input>

 

      <v-btn
        block
        class="mb-8"
        color="green"
        size="large"
        variant="tonal"
        @click="addAnimal(popularite, nom_animal, prix, valeur, file)"
      >
        Ajouter l'animal
      </v-btn>
    </v-card>


  </div>
</template>
