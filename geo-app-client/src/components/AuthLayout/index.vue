<template>
    <v-main class="d-flex flex-column justify-center align-center">
        <router-view />
    </v-main>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
    if (authStore.isAuthenticated) {
        router.push({ name: 'home' })
    }
})
</script>