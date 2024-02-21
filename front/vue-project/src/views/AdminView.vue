<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from "vue";
import Register from "../components/Register.vue";
import add_animal from "@/components/add_animal.vue";
import router from '@/router';



const LoginResponse = ref(false);
const user = JSON.parse(sessionStorage.getItem("user") ?? "null") as string;
const droit = ref(0);
if (user) {
  LoginResponse.value = true;
  droit.value = user.droit;
}
else {
  router.push('/login');
}
async function logout() {
  try {
    sessionStorage.removeItem('user');
    LoginResponse.value = false;
    location.reload();
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
  }
}
</script>

<template>
  <div v-if = "LoginResponse">
  <v-card class="mx-auto" max-width="344" :variant="tonal">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          {{ user.role }}
        </div>
        <div class="text-h6 mb-1">{{user.username}}</div>
      
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn @click = "logout" > Logout </v-btn>
    </v-card-actions>
  </v-card>
  
  <div>
  <div v-if="droit >=2">
      <Register :admin=true />
    </div>
    <div v-if="droit >= 1">
      
      <add_animal />
    </div>
  </div>
</div>
</template>
