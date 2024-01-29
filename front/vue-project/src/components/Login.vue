<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from 'vue';


const visible = ref(false); // Add this 

defineEmits(['connexion', 'inscription']);

const username: Ref<string> = ref('');
const password: Ref<string> = ref('');


</script>

<template>
  <div>
 
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Username</div>

      <v-text-field
        v-model="username"
        density="compact"
        placeholder="Username"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        block
        class="mb-8"
        color="green"
        size="large"
        variant="tonal"
        @click="$emit('connexion', username, password)"
      >
        Connexion
      </v-btn>


      <v-btn
        block
        class="mb-8"
        color="green"
        size="large"
        variant="tonal"
        @click="$emit('inscription', username, password)"
      >
        Inscription
      </v-btn>
    </v-card>
  </div>
</template>