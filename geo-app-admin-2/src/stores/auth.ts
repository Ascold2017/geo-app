import { httpClient } from "@/adapters/httpClient";
import type { User } from "@/models/user.model";
import { defineStore } from "pinia";
import { ref } from "vue";

const defaultUser = {
    token: "",
    id: 0,
    username: "",
    role: 'user',
    isPremium: false,
    registeredAt: new Date()
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref(defaultUser)
    const isAuthenticated = ref(false);

    async function getCurrentUser() {
        const token = localStorage.getItem('token')
        if (!token) return false;
        try {
            const data = await httpClient.request<undefined, User>({
                url: '/auth/' + token, method: 'GET'
            })
            console.log(data)
            user.value = data;
            return true
        } catch {
            return false
        }
    }
    function logout() {
        localStorage.removeItem('token');
        isAuthenticated.value = false;
        user.value = defaultUser;
        location.href = '/'
    }

    return {
        isAuthenticated,
        user,
        getCurrentUser,
        logout
    }
})