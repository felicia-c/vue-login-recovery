<template>
  <div class="recovery-container">
    <h2>Récupération de mot de passe</h2>
    <form @submit.prevent="recoverPassword">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <button type="submit">Envoyer un lien de récupération</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
    <p @click="goBackToLogin" class="back-to-login">Connexion</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',  // User's email input
      message: '', // Success message after requesting password reset
      error: '',   // Error message if request fails
    };
  },
  methods: {
    async recoverPassword() {
      try {
        // eslint-disable-next-line
        const response = await axios.post('http://localhost:3000/api/request-password-reset', { email: this.email });
        this.message = `Un e-mail à été envoyé à ${this.email} avec la procédure à suivre.`;
        this.error = '';  // Clear any previous error message
      } catch (error) {
        this.message = ''; // Clear any previous success message
        this.error = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Une erreur est survenue. Veuillez réessayer.';
      }
    },
    goBackToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>
<style scoped>
.recovery-container {
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
</style>