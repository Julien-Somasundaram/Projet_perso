<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from "vue";
import { UserService } from "../services/UserService";

import { Role } from "../services/Role";
import { AnimalService } from "@/services/Animal/AnimalService";

const US = new UserService();
const AN = new AnimalService();

const roles = ref([Role]);

const visible = ref(false); // Add this

const username: Ref<string> = ref("");
const password: Ref<string> = ref("");
const model_role: Ref<string> = ref("");

const items: Ref<string[]> = ref([]); // Add this


onMounted(async () => {
  try {
    roles.value = await US.getAllRole();
    items.value = roles.value.map((role) => role.nom); // Update this line
  } catch (error) {
    console.error("Erreur lors de la récupération des roles :", error);
  }
});
function create() {
  console.log("create", username.value, password.value, model_role.value);
}

const props = defineProps<{
  admin: boolean;
}>();

async function register(username: string, password: string, role: string) {
  try {
    const response = await US.register(username, password, role);
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
  }
}
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

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
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

      <v-select v-if="props.admin" v-model="model_role" label="Roles" :items="items" required>
      </v-select>

      <v-btn
        block
        class="mb-8"
        color="green"
        size="large"
        variant="tonal"
        @click="register(username, password, admin ? model_role: 'user')"
      >
        Créer un compte
      </v-btn>
    </v-card>
   


  </div>
</template>
