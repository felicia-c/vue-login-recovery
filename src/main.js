import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import PasswordRecovery from './components/PasswordRecovery.vue';

// Define your routes
const routes = [
    { path: '/login', component: LoginPage },
    { path: '/password-recovery', component: PasswordRecovery },
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
