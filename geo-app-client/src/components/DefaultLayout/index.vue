<template>
    <v-main>
        <router-view />
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