import { httpClient } from "@/adapters/httpClient";
import type { SignInPayload, SignUpPayload, User } from "@/models/auth.model";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import _ from 'lodash'
import { useProfileStore } from "./profile/profile";
import { usePush } from "./push";

export const useAuthStore = defineStore('auth', () => {
    const profileStore = useProfileStore();
    const pushStore = usePush()

    const router = useRouter()
    const isAuthenticated = ref(false);

    async function signIn(payload: SignInPayload) {
        try {
            const data = await httpClient.request<SignInPayload, User>({
                url: '/auth/sign-in', method: 'POST', data: payload
            })
            profileStore.setUser(data)
            isAuthenticated.value = true;
            if (data.role === 'user') {
                router.push({ name: 'home' })
            } else {
                await pushStore.unregister()
                location.href = '/admin'
            }
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
            profileStore.setUser(data)
            isAuthenticated.value = true;
            router.push({ name: 'home' })
        } catch (e) {
            // TODO
            return Promise.reject(false)
        }
    }
    
    async function logout() {
        await pushStore.unregister()
        profileStore.resetUser()
        location.href = '/'
    }

    return {
        isAuthenticated,
        signIn,
        signUp,
        logout
    }
})