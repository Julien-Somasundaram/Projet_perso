<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from "vue";
import { Animal } from "../services/Animal/Animal";

const props = defineProps<{
  animal: Animal;
  boutique: boolean;
  quantity: number;
  disponible: string;
}>();
defineEmits(["Acheter, Debloquer"]);

function getImagePath(nom: string) {
  return "http://localhost:3000/api/animal/image/" + nom;
}
</script>
<!-- 
<template>
    <div class="card-body"  :id="props.disponible" @click = "$emit('click-card')">
        Enclos à {{ props.animal.nom }}
        <br />
        <img :src="getImagePath(props.animal.nom)" class="animal-img" alt="" />
        <p v-if="props.quantity" class="quantity">Quantité : {{ props.quantity }}</p>
        <p class="popularite">Popularité : {{ props.animal.popularite }}</p>
        <p class="value">Valeur : {{ props.animal.valeur }}</p>
        <p class="price">
            Prix : {{ props.animal.prix  }}
            <img class="price" id="image" src="../assets/money-icone.png" alt="" />
        </p>
    </div>
</template> -->

<template>
  <v-card :class="['px-8', 'mx-auto']" width="344" :id="props.disponible">
    
    <v-img :src="getImagePath(props.animal.nom)" height="200px" cover></v-img>
    <div class="d-flex align-center flex-column">
    
      <v-card-title>
        {{ props.animal.nom }}
      </v-card-title>
      <p v-if="props.quantity" class="quantity">
        Quantité : {{ props.quantity }}
      </p>
      <p class="popularite">Popularité : {{ props.animal.popularite }}</p>
      <p class="value">Valeur : {{ props.animal.valeur }}</p>
      <p class="price">Prix : {{ props.animal.prix }}</p>
      <v-btn
        v-if="props.boutique"
        color="green"
        @click="$emit('Debloquer', props.animal)"
      >
        Débloquer
      </v-btn>
      <v-btn
        v-if="!props.boutique"
        color="green"
        @click="$emit('Acheter', props.animal)"
      >
        Acheter
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
#non_disponible {
  filter: grayscale(100%);
}
</style>
