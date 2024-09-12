import { reactive } from 'vue';

export const authState = reactive({
    isLoggedIn: !!localStorage.getItem('token'), // Initially set based on token existence
    user: {
        username: localStorage.getItem('username') || '', // Get the username from localStorage
        email: localStorage.getItem('email') || '',
        profilePicture: localStorage.getItem('profilePicture') || '',
    }
});