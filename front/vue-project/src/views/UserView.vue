<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import { UserService } from "../services/UserService";
import { User } from "../services/User";

const US = new UserService();
const users = ref([User]);

onMounted(async () => {
  try {
    users.value = await US.getAll();
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
  }
});
</script>

<template>
  <main>
    <h1>Users:</h1>
    <ul>
      <li v-for="user in users">
        {{ user.username }}, {{ user.id }}
      </li>
    </ul>
  </main>
</template>

<style>
</style>
