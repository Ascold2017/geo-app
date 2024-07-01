import { httpClient } from "@/adapters/httpClient";
import type { BaseUser, ParsedUser } from "@/models/user.model";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import dayjs from 'dayjs'

export const useUsersStore = defineStore('users', () => {
    const users = ref<BaseUser[]>([])
    const isLoading = ref(false);

    const parsedUsers = computed<ParsedUser[]>(() => users.value.map(user => ({
        id: user.id,
        username: user.username,
        isPremium: user.isPremium,
        registeredAt: dayjs(new Date(user.registeredAt))
    })))

    async function getUsers() {
        isLoading.value = true;
        try {
            const data = await httpClient.request<undefined, BaseUser[]>({ url: '/adm/users' })
            users.value = data;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        parsedUsers, isLoading, getUsers
    }
})