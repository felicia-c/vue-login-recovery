import { reactive } from 'vue';

export const authState = reactive({
    isLoggedIn: !!localStorage.getItem('token'), // Initially set based on token existence
});