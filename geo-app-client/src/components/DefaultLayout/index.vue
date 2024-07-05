<template>
    <v-main>
        <router-view />
        <v-bottom-navigation>
            <v-btn :to="{ name: 'home' }" exact>
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
        <WelcomeModal />
    </v-main>
</template>

<script setup lang="ts">
import WelcomeModal from '@/components/WelcomeModal/index.vue'
import { useProfileStore } from '@/stores/profile/profile';
import { onMounted } from 'vue';

const profileStore = useProfileStore();

onMounted(() => {
    profileStore.getCurrentUser();
})
</script>