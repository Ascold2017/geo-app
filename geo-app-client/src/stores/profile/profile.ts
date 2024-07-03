import { httpClient } from "@/adapters/httpClient";
import type { User } from "@/models/auth.model";
import type { UpdateSectionPayload } from "@/models/sections.model";
import router from "@/router";
import dayjs from "dayjs";
import _ from "lodash";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import dictionary from '@/dictionary.json'

const defaultUser: User = {
    token: "",
    id: 0,
    username: "",
    role: 'user',
    currentSectionId: undefined,
    isPremium: false,
    registeredAt: new Date()
}

export const useProfileStore = defineStore('profile', () => {
    const user = ref<User>(_.clone(defaultUser))

    const parsedUser = computed(() => ({
        id: user.value.id,
        sectionId: user.value.currentSectionId || null,
        username: user.value.username,
        isPremium: user.value.isPremium,
        registeredAt: dayjs(user.value.registeredAt)
    }));

    function setUser(data: User) {
        localStorage.setItem(dictionary.localStorageTokenKey, data.token)
        user.value = data;
    }

    function resetUser() {
        localStorage.removeItem(dictionary.localStorageTokenKey)
        user.value = _.clone(defaultUser)
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
    
    async function updateUserSection(sectionId: number) {
        
        try {
            await httpClient.request<UpdateSectionPayload, undefined>({
                url: '/learn/change-section', method: 'POST', data: { sectionId }
            })
            await getCurrentUser()
        } catch (e) {
           // TODO
        }
    }

    return {
        user,
        parsedUser,
        getCurrentUser,
        setUser,
        resetUser,
        updateUserSection
    }
})