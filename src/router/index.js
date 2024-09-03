import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import PasswordRecovery from '../components/PasswordRecovery.vue';
import PasswordReset from '../components/PasswordReset.vue';
import UserListPage from '../components/UserListPage.vue';

const routes = [
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/password-recovery', component: PasswordRecovery },
    { path: '/reset/:token', component: PasswordReset }, // Route with a dynamic token parameter
    { path: '/users', component: UserListPage },
    { path: '/', redirect: '/login' }, // Redirect root to login
    { path: '/:pathMatch(.*)*', redirect: '/login' }, // Redirect any unmatched paths to login
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;