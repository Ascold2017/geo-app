<template>
    <v-app>
        <v-navigation-drawer v-model="isShowDrawer">
            <SidebarMenu />
        </v-navigation-drawer>

        <v-app-bar>
            <v-app-bar-nav-icon @click="isShowDrawer = !isShowDrawer"></v-app-bar-nav-icon>

            <v-app-bar-title>GEO App Admin</v-app-bar-title>
            <v-spacer></v-spacer>
            <span>{{  authStore.user.username }}</span>
            <v-btn @click="authStore.logout">Выйти</v-btn>
        </v-app-bar>

        <v-main>
            <RouterView />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SidebarMenu from '@/components/SidebarMenu/index.vue'
import { useAuthStore } from '@/stores/auth';
const isShowDrawer = ref(false)
const authStore = useAuthStore()
</script>