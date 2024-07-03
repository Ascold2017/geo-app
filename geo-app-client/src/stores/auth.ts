import { httpClient } from "@/adapters/httpClient";
import type { SignInPayload, SignUpPayload, User } from "@/models/auth.model";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import dictionary from '@/dictionary.json'
import _ from 'lodash'

const defaultUser: User = {
    token: "",
    id: 0,
    username: "",
    role: 'user',
    currentSectionId: undefined,
    isPremium: false,
    registeredAt: new Date()
}

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()

    const user = ref<User>(_.clone(defaultUser))
    const isAuthenticated = ref(false);

    function setUser(data: User) {
        localStorage.setItem(dictionary.localStorageTokenKey, data.token)
        user.value = data;
        isAuthenticated.value = true;
    }
    function resetUser() {
        localStorage.removeItem(dictionary.localStorageTokenKey)
        user.value = _.clone(defaultUser)
        isAuthenticated.value = false
    }

    async function signIn(payload: SignInPayload) {
        try {
            const data = await httpClient.request<SignInPayload, User>({
                url: '/auth/sign-in', method: 'POST', data: payload
            })
            setUser(data)
            data.role === 'user' ? router.push({ name: 'home' }) : location.href = '/admin'
        } catch (e) {
            // TODO
            return Promise.reject(false)
        }
    }

    async function signUp(payload: SignUpPayload) {
        try {
            const data = await httpClient.request<SignInPayload, User>({
                url: '/auth/sign-up', method: 'POST', data: payload
            })
            setUser(data)
            router.push({ name: 'home' })
        } catch (e) {
            // TODO
            return Promise.reject(false)
        }
    }

    async function getCurrentUser() {
        const token = localStorage.getItem(dictionary.localStorageTokenKey)
        if (!token) {
            router.push({ name: 'auth' })
            return;
        }
        try {
            const data = await httpClient.request<undefined, User>({
                url: '/auth/' + token, method: 'GET'
            })
            setUser(data)
        } catch {
            // TODO
            router.push({ name: 'auth' })
        }
    }
    function logout() {
        resetUser()
        location.href = '/'
    }

    return {
        isAuthenticated,
        user,
        signIn,
        signUp,
        getCurrentUser,
        logout
    }
})