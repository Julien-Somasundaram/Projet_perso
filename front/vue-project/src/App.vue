<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, defineProps, onMounted, type Ref } from 'vue';
import Header from './components/Header.vue';
import { User } from "./services/User";
const userinfo = JSON.parse(sessionStorage.getItem("user") ?? "null") as User;

const login_status = ref(false);
if (userinfo) {
  login_status.value = true;
}

</script>

<template>
  <Header/>

  <main>
    <RouterView />
  </main>
  
</template>

<style scoped>

</style>
