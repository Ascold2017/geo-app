<template>
    <v-card>
        <v-card-title>Общая информация</v-card-title>
        <v-card-text>
            <p class="mb-3">Username: {{ parsedUser.username }}</p>
            <p class="mb-3">Аккаунт: {{ parsedUser.isPremium ? 'Премиум' : 'Обычный' }}</p>
            <p class="mb-3">Зарегистрирован: {{ parsedUser.registeredAt.format('DD.MM.YYYY') }}</p>
            <v-select label="Уровень" density="compact" :items="sectionItems" :modelValue="parsedUser.sectionId" @update:model-value="authStore.updateUserSection" />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useSectionsStore } from "@/stores/sections";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
const authStore = useAuthStore()
const { parsedUser } = storeToRefs(authStore)
const sectionsStore = useSectionsStore();

const sectionItems = computed(() => sectionsStore.sections.map(section => ({ value: section.id, title: section.title })))
onMounted(() => {
    sectionsStore.getSections()
})
</script>