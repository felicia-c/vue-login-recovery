<template>
  <div class="user-list-container">
    <h2>Tous les utilisateurs</h2>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user._id">
        {{ user.email }}
      </li>
    </ul>
    <p v-else>Aucun compte trouvé.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      this.users = response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
};
</script>

<style scoped>
.user-list-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
</style>