<template>
    <v-list>
        <v-list-item v-for="menuItem in menuItems"  :title="menuItem.title" :to="menuItem.to" />
    </v-list>
</template>

<script setup lang="ts">
const menuItems = [
    {
        title: 'Темы',
        to: { name: 'topics'}
    },
    {
        title: 'Секции',
        to: { name: 'sections'}
    },
    {
        title: 'Пользователи',
        to: { name: 'users'}
    }
]
</script>