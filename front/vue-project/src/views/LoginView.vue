<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from 'vue';
import { UserService } from "../services/UserService";
import { User } from "../services/User";

const US = new UserService();
const username:Ref<string> = ref('');
const password:Ref<string> = ref('');
let LoginResponse:Ref<Boolean> = ref(false);

async function login(username: string, password: string) {
  try {
    const response = await US.login(username, password);
    LoginResponse.value = response;  
    console.log(LoginResponse);
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
  }
}


</script>

<template>
  <main>
    <h1>Login:</h1>
    <label for="username">Username:</label>
    <input type="text" v-model="username" />
    <label for="password">Password:</label>
    <input type="password" v-model="password" />
    <button @click="login(username, password)">Login</button>
    <p v-if="LoginResponse">Login successful</p>


  </main>
</template>

<style>
</style>
