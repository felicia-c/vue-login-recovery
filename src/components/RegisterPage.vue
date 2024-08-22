<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
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
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:3000/api/register', {
          email: this.email,
          password: this.password,
        });

        if (response.data.status === 'ok') {
          alert(`Inscription réussie ! Veuillez vous connecter.`);
          this.$router.push('/login');
        } else {
          alert(`L'inscription a échoué : ` + response.data.error);
        }
      } catch (error) {
        console.error(`Il y a eu une erreur lors de l'inscription:`, error);
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
