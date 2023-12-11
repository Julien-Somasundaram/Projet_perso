<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from 'vue';
import { UserService } from "../services/UserService";
import { User } from "../services/User";
import Header from "../components/Header.vue";
import router from '@/router';
const US = new UserService();
const username:Ref<string> = ref('');
const password:Ref<string> = ref('');
const user = ref(User);
let LoginResponse:Ref<Boolean> = ref(false);
const userinfo = JSON.parse(localStorage.getItem("user") ?? "null") as User;
onMounted(async () => {
    try {
        if (userinfo) {
            user.value = userinfo;
            LoginResponse.value = true;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
    }
});

async function login(username: string, password: string) {
  try {
    user.value = await US.login(username, password);
    if (user.value)
        localStorage.setItem('user', JSON.stringify(user.value));
        LoginResponse.value = true;
        // redirect to home page
        router.push('/');
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
  }
}
async function logout() {
    try {
        localStorage.removeItem('user');
        LoginResponse.value = false;
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
}

</script>

<template>
  <main>
    <Header />
    <h1>Login:</h1>
    <div v-if="LoginResponse">
      <button @click="logout()">Logout</button>

    </div>
    <div v-else="LoginResponse">

      <label for="username">Username:</label>
      <input type="text" v-model="username" />
      <label for="password">Password:</label>
      <input type="password" v-model="password" />
      <button @click="login(username, password)">Login</button>  
      <p>Vous n'avez pas de compte ?</p>
      <router-link to="/register">Créer un compte</router-link>
    </div>



  </main>
</template>

<style>
</style>
