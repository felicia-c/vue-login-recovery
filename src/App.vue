<template>
  <div id="app">

    <nav>
      <router-link to="/login">Connexion</router-link>
      <router-link to="/register">Inscription</router-link>
      <router-link to="/users">Utilisateurs</router-link> <!-- Add a link to the user list -->
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  text-decoration: none;
  color: #000;
}

nav {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: center;
  a {
    padding-bottom: 0.3rem;
    display: flex;
    align-items: center;
    &:hover {
      color: cadetblue;
      border-bottom: 1px solid cadetblue;
      transition: color 0.3s ease-in-out;
    }

    &.router-link-active {
      font-weight: bolder;
      color: cadetblue;
      font-size: 1.2rem;
    }
  }
}

button {
  border: none;
  background-color: lightslategray;
  padding: 15px 30px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: cadetblue;
  }
}

</style>
