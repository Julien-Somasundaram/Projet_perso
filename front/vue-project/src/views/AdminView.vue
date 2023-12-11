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
const valeur: Ref<number> = ref(0);
const prix: Ref<number> = ref(0);
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
async function addAnimal(
  nom: string,
  prix: number,
  valeur: number,
  popularite: number,
  file: File
) {
  try {
    const response = await AN.add(nom, prix, valeur, popularite, file);
  } catch (error) {
    alert(error);
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
      <div v-if="user.droit >= 2">
        <h1>Admin</h1>
        <div class="card_admin">
          <h1>Créer un utilisateur</h1>
          <label for="username">Username:</label>
          <input type="text" v-model="username" />
          <br />
          <label for="password">Password:</label>
          <input type="password" v-model="password" />
          <br />
          <label for="role">Role:</label>
          <select v-model="model_role">
            <option v-for="role in roles" :value="role.nom">
              {{ role.nom }}
            </option>
          </select>
          <br />
          <button @click="register(username, password, model_role)">
            Register
          </button>
        </div>
        voir les utilisateurs:
        <button @click="voir_users()">voir</button>
        <ul v-if="lb_voir_users">
          <li v-for="user in users">
            {{ user.username }}, {{ user.id }}, {{ user.role }}
          </li>
        </ul>
      </div>
      <div v-if="user.droit >= 1">
        <form>
          <div class="card_admin">
            <h1>Ajouter un animal</h1>
            <label for="nom">Nom:</label>
            <input type="text" v-model="nom_animal" required />
            <br />
            <label for="prix">Prix:</label>
            <input type="number" v-model="prix" />
            <br />
            <label for="valeur">Valeur:</label>
            <input type="number" v-model="valeur" />
            <br />
            <label for="popularite">Popularité:</label>
            <input type="number" v-model="popularite" />
            <br />
            <label for="file">Image:</label>
            <input
              type="file"
              required
              v-on:change="file = $event.target.files[0]"
            />
            <input
              type="submit"
              @click="addAnimal(nom_animal, prix, valeur, popularite, file)"
            />
          </div>
        </form>
      </div>
      <div v-if="user.droit == 0">
        <h1>Vous n'avez pas les droits pour acceder à cette page</h1>
      </div>
    </div>
    <div v-else>
      <h1>Veuillez vous connecter</h1>
      <router-link to="/login">Login</router-link>
    </div>
  </main>
</template>

<style>
.card_admin {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.6);
  transition: 0.3s;
  width: 300px;
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  background-color: rgb(44, 59, 44);
}
</style>
