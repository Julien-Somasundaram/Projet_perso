<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from 'vue';
import { UserService } from "../services/UserService";
import { User } from "../services/User";

const US = new UserService();
const username:Ref<string> = ref('');
const password:Ref<string> = ref('');

async function register(username: string, password: string) {
  try {
    console.log("register");
    const response = await US.register(username, password,'user');

  } catch (error) {
    alert(error)
  }
}


</script>

<template>
  <main>
    <h1>Register:</h1>
    <label for="username">Username:</label>
    <input type="text" v-model="username" />
    <label for="password">Password:</label>
    <input type="password" v-model="password" />
    <button @click="register(username, password)">Register</button>

  </main>
</template>

<style>
</style>
