<template>
  <div class="recovery-container">
    <h2>Récupération de mot de passe</h2>
    <form @submit.prevent="recoverPassword">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <button type="submit">Envoyer</button>
    </form>
    <p @click="goBackToLogin" class="back-to-login">Retour</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    recoverPassword() {
      // Handle password recovery logic here
      alert(`Un email a été envoyé à l'adresse suivante: ${this.email}`);
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