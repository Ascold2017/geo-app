<template>
     <v-toolbar flat class="mb-3">
        <v-toolbar-title>{{ isNewTask ? 'Создание упражнения' : 'Изменение упражнения' }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn @click="topicTaskStore.saveTask" :disabled="!isChanged">Сохранить</v-btn>
        <v-btn @click="topicTaskStore.deleteTask" v-if="!isNewTask">Удалить</v-btn>
    </v-toolbar>

    <div class="d-flex">
        <v-text-field label="Грузинский" v-model="currentTask.ka" />
        <v-text-field label="Русский" v-model="currentTask.ru" />
    </div>
    <div class="d-flex">
        <v-text-field label="Транскрипция" v-model="currentTask.transcription" />
        <v-select label="Тип упражнения" v-model="currentTask.type" :items="taskTypes"/>
    </div>
    <ImageUploader :value="currentTask.imageUrl" @change="currentTask.imageUrl = $event"/>
    
</template>

<script setup lang="ts">
import ImageUploader from '@/components/ImageUploader/index.vue'
import { TaskTypesEnum } from '@/models/tasks.model';
import { useTopicTasksStore } from '@/stores/topics/topicTasks';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';


const topicTaskStore = useTopicTasksStore();
const { currentTask, isNewTask, isChanged} = storeToRefs(topicTaskStore)

const taskTypes = computed(() => Object.keys(TaskTypesEnum).map(v => ({ value: v, title: v })))
</script>