import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginPage.vue';
import PasswordRecovery from './components/PasswordRecovery.vue';
import Register from './components/RegisterPage.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/password-recovery', component: PasswordRecovery },
    { path: '/register', component: Register },
    { path: '/:pathMatch(.*)*', redirect: '/login' }, // Redirect all other paths to login
];

// Create the router instance and pass the `routes` option
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Create the Vue app instance
const app = createApp(App);

// Use the router with the app instance
app.use(router);

// Mount the app to the DOM
app.mount('#app');
