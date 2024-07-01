<template>
    <v-toolbar flat class="mb-3">
        <v-btn :to="{ name: 'topicEdit', params: { id: route.params.id } }">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ isNewTask ? 'Создание упражнения' : 'Изменение упражнения' }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn @click="topicTaskStore.resetTask">Сбросить</v-btn>
        <v-btn @click="topicTaskStore.saveTask(+route.params.id)" :disabled="!isChanged">Сохранить</v-btn>
        <v-btn @click="topicTaskStore.deleteTask(+route.params.id)" v-if="!isNewTask">Удалить</v-btn>

    </v-toolbar>
    <div class="px-3 py-3">
        <div class="d-flex">
            <v-text-field label="Грузинский" v-model="currentTask.ka" />
            <v-text-field label="Русский" v-model="currentTask.ru" />
        </div>
        <div class="d-flex">
            <v-text-field label="Транскрипция" v-model="currentTask.transcription" />
            <v-select label="Тип упражнения" v-model="currentTask.type" :items="taskTypes" />
        </div>
        <ImageUploader label="Изображение" :value="currentTask.imageUrl!" @change="currentTask.imageUrl = $event!" />
        <AudioRecorder :value="currentTask.soundUrl!" @change="currentTask.soundUrl = $event!" />
    </div>
</template>

<script setup lang="ts">
import ImageUploader from '@/components/ImageUploader/index.vue'
import AudioRecorder from '@/components/AudioRecorder/index.vue'
import { TaskTypesEnum } from '@/models/tasks.model';
import { useTopicTasksStore } from '@/stores/topics/topicTasks';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
// @ts-ignore
const route = useRoute<{ id: number; }>()

const topicTaskStore = useTopicTasksStore();
const { currentTask, isNewTask, isChanged } = storeToRefs(topicTaskStore)

const taskTypes = computed(() => Object.keys(TaskTypesEnum).map(v => ({ value: v, title: v })))
</script>