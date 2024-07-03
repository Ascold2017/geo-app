<template>
    <v-card>
        <v-card-title>Прогресс</v-card-title>

        <v-list>
            <v-list-item v-for="task in parsedProgress" :key="task.id" :title="task.title" :subtitle="task.subtitle">
                <template v-slot:prepend>
                    <v-icon v-if="task.icon" :icon="task.icon"></v-icon>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script setup lang="ts">
import { useProgressStore } from '@/stores/profile/progress';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

const progressStore = useProgressStore()
const { progress } = storeToRefs(progressStore)

const parsedProgress = computed(() => progress.value.map(task => ({
    id: task.id,
    title: `${task.ka}[${task.transcription}]`,
    subtitle: `Повторено: ${task.repeated} раз. Следующий: ${dayjs(task.nextRepeat).format('dddd HH:mm')}`,
    icon: (() => {
        if (task.type === 'letter') return 'mdi-order-alphabetical-ascending'
        if (task.type === 'word') return 'mdi-file-word-box-outline'
        if (task.type === 'sentence') return 'mdi-order-bool-ascending'
        return null
    })()
})))
onMounted(() => {
    progressStore.getProgress()
})
</script>