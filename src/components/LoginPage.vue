<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">C'est parti !</button>
    </form>
    <p @click="goToPasswordRecovery" class="forgot-password">Mot de passe oublié ?</p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.status === 'ok') {
          alert('Connecté•e en tant que ${this.email}');
          // Handle successful login, e.g., save token, redirect, etc.
        } else {
          alert('Non connecté•e');
        }
      } catch (error) {
        console.error('Une erreur est survenue lors de la connexion:', error);
      }
    },
    goToPasswordRecovery() {
      this.$router.push('/password-recovery');
    },
  },
};

</script>

<style scoped>
.login-container {
  max-width: 420px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* display: inline-block; */
}
.forgot-password {
  color: lightslategray;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    color: cadetblue;
  }
}
form > div {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

input {
  border: none;
  border-bottom: 1px solid lightslategray;
  width: 100%;
  margin-top: 10px;
  padding: 8px 2px;
  display: inline-block;
}

button {
  border: none;
  background-color: lightslategray;
  padding: 15px 30px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color ease-in-out 1s;
  &:hover {
    background-color: cadetblue;
  }
}

</style>
