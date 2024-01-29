<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from 'vue';
import { UserService } from "../services/UserService";
import { User } from "../services/User";
import Login from '../components/Login.vue'
import router from '@/router';



const US = new UserService();

const user = ref(User);
let LoginResponse: Ref<Boolean> = ref(false);
const userinfo = JSON.parse(sessionStorage.getItem("user") ?? "null") as User;
onMounted(async () => {
  try {
    if (userinfo) {
      user.value = userinfo;
      LoginResponse.value = true;
      router.push('/');

    }
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
  }
});

async function login(username: string, password: string) {
 
  try {
    user.value = await US.login(username, password);
    if (user.value) {
      sessionStorage.setItem('user', JSON.stringify(user.value));
      LoginResponse.value = true;
      location.reload();

    }
    else{
      alert("erreur de connexion")
    }
    
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
  }
}
async function logout() {
  try {
    sessionStorage.removeItem('user');
    LoginResponse.value = false;
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
  }
}
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
    <div v-if="LoginResponse">
    vous estes connecter
      <button @click="logout()">Logout</button>
    </div>
    <div v-else>
    <Login @connexion="login" @inscription="register"
    /> 
    </div>
  </main>

</template>