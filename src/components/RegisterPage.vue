<template>
  <div class="register-container">
    <h2>Inscription</h2>
    <form @submit.prevent="registerUser">
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
    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
    <p @click="goToLogin" class="back-to-login">Déjà enregistré ? Connectez-vous ici</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      message: '',
      error: '',
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }

      try {
        // eslint-disable-next-line
        const response = await axios.post('http://localhost:3000/api/register', {
          email: this.email,
          password: this.password,
        });
        this.message = "Registration successful. Please log in.";
        this.error = '';
      } catch (error) {
        this.message = '';
        this.error = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Error registering user. Please try again.';

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
</style>
