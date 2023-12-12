<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from "vue";
import { Animal } from "../services/Animal/Animal";

defineProps<{
  animal: Animal;
  boutique: boolean;
}>();
defineEmits(['compteur'])

function getImagePath(nom: string) {
  return "http://localhost:3000/api/animal/image/" + nom;
}

</script>

<template>
    <div class="card-body" @click = "$emit('compteur',1)">
        Enclos à {{ animal.nom }}
        <br />
        <img :src="getImagePath(animal.nom)" class="animal-img" alt="" />
        <p class="popularite">Popularité : {{ animal.popularite }}</p>
        <p class="value">Valeur : {{ animal.valeur }}</p>
        <p class="price">
            Prix : {{ animal.prix * 10 }}
            <img class="price" id="image" src="../assets/money-icone.png" alt="" />
        </p>
    </div>
</template>

<style scoped>

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

</style>
