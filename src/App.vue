<template>
  <div id="app">
    <nav>
        <router-link to="/register">Inscription</router-link>
        <router-link to="/users">Utilisateurs</router-link> <!-- Add a link to the user list -->
      <div class="login-logout">
        <!-- Show "Log in" if the user is not logged in -->
        <router-link v-if="!authState.isLoggedIn" to="/login" class="login">Connexion</router-link>
        <!-- Show "Log out" if the user is logged in -->
        <div v-if="authState.isLoggedIn" >
        <button @click="logout" class="logout">Se déconnecter</button>
          <div class="user-profile">
            <img :src="profilePictureUrl" class="navbar-profile-pic" alt="Profile Picture">
            <p class="username">
              <b>{{ authState.user.username }}</b>
            </p>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { authState } from './auth';
import axios from "axios"; // Import the reactive login state
const BASE_URL = process.env.VUE_APP_BASE_URL;
export default {
  name: 'App',
  data() {
    return {
      user: {
        profilePicture: '',
        username: '',
      },
       defaultProfilePic: '/img/default-profile.png' // Fallback image
    };
  },
  computed: {
    // Check if the user is logged in by looking for the token in localStorage
    authState() {
      return authState; // Use the reactive login state
    },
    profilePictureUrl() {
      // If the user has a profile picture, dynamically build the URL, else use default
      return authState.user.profilePicture
          ? process.env.VUE_APP_BASE_URL + 'uploads/' + authState.user.profilePicture
          : this.defaultProfilePic;
    }
  },
  methods: {
    logout() {
      // Remove the token from localStorage to log the user out
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('profilePicture');

      authState.isLoggedIn = false; // Update the reactive state
      authState.user.username = '';
      authState.user.email = '';
      authState.user.profilePicture = '';

      this.$router.push('/login'); // Redirect to the login page
    },
    async fetchUserProfile() {
      try {
        // Simulate an API request to fetch the user data (including profilePicture)
        const response = await axios.get(`${BASE_URL}api/me`);
        this.user = response.data; // Assign the response data to the user object
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.fetchUserProfile(); // Fetch user data (including profile picture)
    }
  }
};


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  text-decoration: none;
  color: #000;
}

nav {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: center;
  a {
    padding-bottom: 0.3rem;
    display: flex;
    align-items: center;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: cadetblue;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      color: cadetblue;
      &::before {
        transform: scaleX(1);
      }
    }

    &.router-link-active:not(.login) {
      font-weight: bolder;
      color: cadetblue;
      font-size: 1.2rem;
      cursor: default;
      &:hover {
        &::before {
          transform: scaleX(0);
        }
      }
    }
  }

  .user-profile {
    display: flex;
    align-items: center;
  }

  .navbar-profile-pic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 10px;
  }

  .login-logout {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}

a.login {
  padding: 10px 15px;
  font-size: 1rem;
  background-color: lightslategray;
  color: white;
  transition: all 0.3s ease-in-out;
  &:not(.router-link-active ):hover {
    color: white;
    background-color: cadetblue;
  }

  &.router-link-active {
    background-color: cadetblue;
    &:hover {
    }
    cursor: default;
    color: white;
  }
}

button {
  border: none;
  background-color: lightslategray;
  padding: 15px 30px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: cadetblue;
  }

  &.logout {
    padding: 10px 15px;
    font-size: 1rem;
  }
}

</style>
