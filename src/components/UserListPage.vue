<template>
  <div class="user-list-container">
    <h2>Tous les utilisateurs</h2>
    <div>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </div>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user._id">
        <!-- Editing mode -->
        <div v-if="editingUser === user._id" class="edit-form">
          <div>
            <input v-model="userEdit.username" placeholder="Username" />
            <input v-model="userEdit.email" type="email" placeholder="Email" />
          </div>
          <div>
            <button @click="updateUser(user._id)">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </div>
        </div>
        <div v-else class="user-datas">
          <span><b>{{ user.username }}</b> - {{ user.email }}</span>
          <button @click="editUser(user)">Edit</button>
        </div>
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
      editingUser: null, // Track which user is being edited
      userEdit: { username: '', email: '' }, // Track user data being edited
      error: '',
      success: '',
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        // eslint-disable-next-line
        const response = await axios.get('http://localhost:3000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
        this.error = 'Error fetching users.';
      }
    },
    editUser(user) {
      // eslint-disable-next-line
      this.editingUser = user._id; // Set the user being edited
      this.userEdit = { username: user.username, email: user.email }; // Copy the user data to userEdit
      this.success = '';
      this.error = '';
    },
    async updateUser(userId) {
      try {
        // eslint-disable-next-line
        const response = await axios.put(`http://localhost:3000/api/users/${userId}`, {
          username: this.userEdit.username,
          email: this.userEdit.email
        });
        this.success = `Modification du compte de ${this.userEdit.username} réussie !`;
        this.editingUser = null; // Stop editing mode
        await this.fetchUsers(); // Refresh the list
      } catch (error) {
        this.error = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Erreur lors de la modification.';
      }
    },
    cancelEdit() {
      this.editingUser = null; // Cancel edit mode
      this.userEdit = { username: '', email: '' }; // Reset the edit form
      this.fetchUsers(); // Re-fetch users to reset any unsaved changes
    }
  }
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
  display: flex;
  justify-content: space-between;
}

.edit-form,
.user-datas {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
input {
  margin-right: 20px;
  padding:5px 10px;
  border: none;
  border-bottom: 1px solid lightslategray;
}
button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: lightslategray;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: cadetblue;
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