<script setup lang="ts">
import { ref, defineProps, onMounted, type Ref } from "vue";
import { UserService } from "../services/UserService";
import { User } from "../services/User";
import { Role } from "../services/Role";
import { AnimalService } from "@/services/Animal/AnimalService";
import Header from "../components/Header.vue";

const US = new UserService();
const AN = new AnimalService();
const users = ref([User]);
const roles = ref([Role]);

const username: Ref<string> = ref("");
const password: Ref<string> = ref("");
const model_role: Ref<string> = ref("");
const nom_animal: Ref<string> = ref("");
const popularite: Ref<number> = ref(0);
const prix : Ref<number> = ref(0);
let lb_voir_users: Ref<Boolean> = ref(false);
const file: Ref<File> = ref(new File([""], "filename"));
onMounted(async () => {
  try {
    roles.value = await US.getAllRole();
    users.value = await US.getAll();
  } catch (error) {
    console.error("Erreur lors de la récupération des roles :", error);
  }
});
async function register(username: string, password: string, role: string) {
  try {
    const response = await US.register(username, password, role);
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
  }
}
async function addAnimal(nom: string, prix: number, popularite: number, file: File) {
  try {
    const response = await AN.add(nom, prix, popularite, file);
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
  }
}
function voir_users() {
  if (lb_voir_users.value) lb_voir_users.value = false;
  else lb_voir_users.value = true;
}
const user = JSON.parse(localStorage.getItem("user") ?? "null") as string;

</script>

<template>
  <main>
    <Header />
    <!-- if les droits de user > 3 affiche les elements ci-dessous -->
    <div v-if="user">
      <div v-if="user.droit  >= 2">
        <h1>Admin</h1>
        <h1>Créer un utilisateur</h1>
        <label for="username">Username:</label>
        <input type="text" v-model="username" />
        <label for="password">Password:</label>
        <input type="password" v-model="password" />
        <select v-model="model_role"  >
          <option v-for="role in roles" :value="role.nom">
            {{ role.nom }}
          </option>
        </select>
        <button @click="register(username, password, model_role)">
          Register
        </button>
        voir les utilisateurs:
        <button @click="voir_users()">voir</button>
        <ul v-if="lb_voir_users">
          <li v-for="user in users">
            {{ user.username }}, {{ user.id }}, {{ user.role }}
          </li>
        </ul>

        <v-card class="mx-auto" max-width="300">
          <v-list :items="users"></v-list>
        </v-card>
        <div>
          <h1>Ajouter un animal</h1>
          <label for="nom">Nom:</label>
          <input type="text" v-model="nom_animal" />
          <label for="prix">Prix:</label>
          <input type="number" v-model="prix" />
          <label for="popularite">Popularité:</label>
          <input type="number" v-model="popularite" />
          <label for="file">Image:</label>
          <input type="file" v-on:change="file = $event.target.files[0]" />
          <button @click="addAnimal(nom_animal, prix, popularite, file)">
            Ajouter
          </button>


        </div>
      </div>
      <div v-else>
        <h1>Vous n'avez pas les droits pour acceder à cette page</h1>
      </div>    
    </div>
    <div v-else>
      <h1>Veuillez vous connecter</h1>
        <router-link to="/login">Login</router-link>
    </div>
  </main>
</template>

<style></style>
