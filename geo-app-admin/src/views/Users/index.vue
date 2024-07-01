<template>
    <v-container>
        <v-data-table-virtual :headers="headers" :items="usersStore.parsedUsers">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Пользователи</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>

        </v-data-table-virtual>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { ParsedUser } from '@/models/user.model'
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()

onMounted(() => {
    usersStore.getUsers()
})

const headers = [
    {
        title: 'Название',
        key: 'username'
    },
    {
        title: 'Премиум',
        key: 'isPremium',
        value: (item: ParsedUser) => item.isPremium ? '+' : '-'
    },
    {
        title: 'Зарегистрирован',
        key: 'registeredAt',
        value: (item: ParsedUser) => item.registeredAt.format('DD.MM.YYYY HH:mm')
    },

]
</script>