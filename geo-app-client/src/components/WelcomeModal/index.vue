<template>
    <v-dialog max-width="500" v-model="isShowWelcomeModal" persistent>
        <v-card :title="title">
            <v-card-text>
                <p class="mb-3">Выберите уровень, с которой хотите начать изучение</p>
                <v-select label="Уровень" density="compact" :items="sectionItems" :modelValue="parsedUser.sectionId" @update:model-value="profileStore.updateUserSection" />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile/profile';
import { useSectionsStore } from '@/stores/sections';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';

const profileStore = useProfileStore();
const sectionsStore = useSectionsStore();
const { parsedUser } = storeToRefs(profileStore)

const isShowWelcomeModal = ref(false);
const title = computed(() => `Добро пожаловать, ${parsedUser.value.username}!`)
const sectionItems = computed(() => sectionsStore.sections.map(section => ({ value: section.id, title: section.title })))

watch(parsedUser, (v) => {
    if (v && !v.sectionId) {
        isShowWelcomeModal.value = true;
    } else {
        isShowWelcomeModal.value = false;
    }
})

onMounted(() => {
    sectionsStore.getSections()
})
</script>