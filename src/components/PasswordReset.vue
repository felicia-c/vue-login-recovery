<template>
  <div class="reset-container">
    <h2>Réinitialiser le mot de passe</h2>
    <form @submit.prevent="resetPassword">
      <div>
        <label for="password">Nouveau mot de passe:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Réinitialiser</button>
      <p @click="goBackToLogin" class="back-to-login">Retour</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      password: '',
    };
  },
  methods: {
    async resetPassword() {
      try {
        const token = this.$route.params.token;
        const response = await axios.post(`http://localhost:3000/api/reset-password/${token}`, { password: this.password });
        alert(response.data.message);
        this.$router.push('/login');
      } catch (error) {
        alert('Erreur lors de la réinitialisation');
        console.log(error);
      }
    },
    goBackToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.reset-container {
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