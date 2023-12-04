<template>
    <div class="header">
      <div class="logo">
        <h1>My ZOO</h1>
      </div>
      <nav class="nav-links">
        <!-- Vos liens de navigation ici -->
        <router-link to="/">Accueil</router-link>
        <router-link to="/zoo">Zoo</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/admin">Admin</router-link>
      </nav>
    </div>
  </template>
  
  
  <style scoped>
  /* Styles pour l'en-tête */
  .header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #333;
  color: white;
  }
  
  .logo {
    font-size: 24px;
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
  }
  
  .nav-links a {
    color: white;
    text-decoration: none;
  }
  
  /* Autres styles d'en-tête si nécessaire */
  </style>
  