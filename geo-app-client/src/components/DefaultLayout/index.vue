<template>
    <v-main>
        <router-view />
        <v-bottom-navigation>
            <v-btn :to="{ name: 'home' }">
                <v-icon>mdi-heart</v-icon>
                <span>Темы</span>
            </v-btn>

            <v-btn :to="{ name: 'training' }">
                <v-icon>mdi-history</v-icon>
                <span>Тренировка</span>
            </v-btn>

            <v-btn :to="{ name: 'profile' }">
                <v-icon>mdi-account</v-icon>
                <span>Профиль</span>
            </v-btn>
        </v-bottom-navigation>
    </v-main>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
    authStore.getCurrentUser();
})
</script>