<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Connexion</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p @click="goToPasswordRecovery" class="forgot-password">Mot de passe oublié ?</p>
    <p @click="goToRegister" class="register-link">Créer un compte</p>
  </div>
</template>

<script>
import { authState } from '@/auth'; // Import the reactive login state
import axios from 'axios';
const BASE_URL = process.env.VUE_APP_BASE_URL;
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(`${BASE_URL}api/login`, {
          email: this.email,
          password: this.password,
        });
        // Store token and username in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('profilePicture', response.data.user.profilePicture);

        // Update the reactive login state
        authState.isLoggedIn = true;
        authState.user.username = response.data.user.username;
        authState.user.email = response.data.user.email;
        authState.user.profilePicture = response.data.user.profilePicture;

        this.error = '';
        alert(`Connecté•e en tant que ${this.email}`);
        this.$router.push('/users'); // Redirect to dashboard or some other page
      } catch (error) {
        this.error = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Une erreur est survenue. Veuillez réessayer.';
      }
    },
    goToRegister() {
      this.$router.push('/register');
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
}
.forgot-password,
.register-link {
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

.error {
  background-color: pink;
  color: red;
  margin-top: 10px;
  padding: 15px 20px;
}
</style>
