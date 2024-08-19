<template>
  <div class="recovery-container">
    <h2>Password Recovery</h2>
    <form @submit.prevent="recoverPassword">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <button type="submit">Recover Password</button>
    </form>
    <p @click="goBackToLogin" class="back-to-login">Back to Login</p>
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
      alert(`Password recovery link sent to ${this.email}`);
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
  color: blue;
  cursor: pointer;
  margin-top: 10px;
}
</style>