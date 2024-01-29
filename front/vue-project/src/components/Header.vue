<script setup lang="ts">
import { ref, type Ref,defineProps } from "vue";
import { useTheme } from "vuetify";
import {User} from "../services/User";
const userinfo = JSON.parse(sessionStorage.getItem("user") ?? "null") as User;

const login_status = ref(false);
if (userinfo) {
  login_status.value = true;
}

const darktheme = ref(false);

const theme = useTheme();
let LoginResponse: Ref<Boolean> = ref(false);


function changeTheme() {
  darktheme.value = !darktheme.value;
  theme.global.name.value = darktheme.value ? "dark" : "light";
}
const props = defineProps<{
  isLoggedIn: boolean;
}>();
</script>

<template>
  <v-toolbar density="compact">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <RouterLink to="/">
      <v-toolbar-title>MY ZOO</v-toolbar-title>
    </RouterLink>
    <v-spacer></v-spacer>

    <v-btn icon @click="changeTheme">
      <v-icon :icon="darktheme ? 'mdi-weather-sunny' : 'mdi-weather-night'">
      </v-icon>
    </v-btn>
    
    <div v-if = "login_status">

      <v-btn icon to="/admin">
        <v-icon> mdi-account </v-icon>
      </v-btn>
      
      <v-btn icon to="/zoo">
        <v-icon> mdi-dog-side </v-icon>
      </v-btn>
      
      <v-btn icon to="/test">
        <v-icon> mdi-wrench </v-icon>
      </v-btn>
    </div>
    <div v-else>
      <v-btn  to="/login" text="Login"> </v-btn>

    </div>
    </v-toolbar>
</template>
