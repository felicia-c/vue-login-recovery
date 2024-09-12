<template>
  <div class="register-container">
    <h2>Inscription</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Nom d'utilisateur:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirmer le mot de passe:</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" required />
      </div>
      <button type="submit">Inscription</button>
    </form>
    <p v-if="success" class="success">{{ success }}</p>
    <p v-if="error" class="error">{{ error }}</p>
    <p @click="goToLogin" class="back-to-login">Déjà enregistré ? Connectez-vous ici</p>
  </div>
</template>

<script>
import axios from 'axios';
const BASE_URL = process.env.VUE_APP_BASE_URL;
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      success: '',
      error: '',
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        this.error = "Les mots de passe ne correspondent pas.";
        return;
      }

      try {
        // eslint-disable-next-line
        const response = await axios.post(`${BASE_URL}api/register`, {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.success = "Inscritption réussie ! Veuillez vous connecter.";
        this.error = '';
      } catch (error) {
        this.success = '';
        this.error = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Une erreur est survenue. Veuillez réessayer.';

        console.error('Error in RegisterPage:', error);
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.back-to-login {
  color: lightslategray;
  cursor: pointer;
  margin-top: 10px;
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

.success {
  background-color: lightgoldenrodyellow;
  color: green;
  margin-top: 10px;
  padding: 15px 20px;
}
.error {
  background-color: pink;
  color: red;
  margin-top: 10px;
  padding: 15px 20px;
}
</style>
