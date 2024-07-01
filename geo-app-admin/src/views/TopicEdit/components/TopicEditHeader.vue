<template>
    <v-toolbar flat>
        <v-btn :to="{ name: 'topics' }">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ isNewTopic ? 'Создание темы' : 'Изменение темы' }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn @click="saveTopic" :disabled="!isChanged">Сохранить</v-btn>
        <v-btn @click="deleteSection" v-if="!isNewTopic">Удалить</v-btn>
        <v-btn v-if="route.params.id" :to="{ name: 'topicTasks', params: { id: route.params.id } }">
            Упражнения
            <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
    </v-toolbar>

</template>

<script setup lang="ts">
import { useTopicStore } from '@/stores/topics/topic';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
// @ts-ignore
const route = useRoute<{ id?: string }>()
const topicStore = useTopicStore()
const { isChanged, isNewTopic, topic } = storeToRefs(topicStore)
const router = useRouter()

async function saveTopic() {
    await topicStore.saveTopic()
    router.push({ name: 'topicEdit', params: { id: topic.value.id }})
    
}
function deleteSection() {
    if (topicStore.isNewTopic) return
    topicStore.deleteTopic(+route.params.id)
    router.push({ name: 'topics' })
}
</script>