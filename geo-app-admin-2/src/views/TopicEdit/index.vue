<template>
  <v-container>
        <v-card :loading="isLoading">
            <v-toolbar flat>
                <v-btn :to="{ name: 'topics' }">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-toolbar-title>{{ topicStore.isNewTopic ? 'Создание темы' : 'Изменение темы' }}</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn @click="topicStore.saveTopic" :disabled="!isChanged">Сохранить</v-btn>
                <v-btn @click="deleteSection" v-if="!topicStore.isNewTopic">Удалить</v-btn>
            </v-toolbar>

            <v-text-field label="Название секции" v-model="topic.title"/>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { useSectionStore } from '@/stores/sections/section';
import { useTopicStore } from '@/stores/topics/topic';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const topicStore = useTopicStore()
const route = useRoute<{ id?: string }>()
const router = useRouter()
const { topic, isChanged, isLoading } = storeToRefs(topicStore)
onMounted(() => {
    if (route.params.id) {
        topicStore.getTopicWithTasks(+route.params.id)
    }
})

function deleteSection() {
    if (topicStore.isNewTopic) return
    topicStore.deleteTopic(+route.params.id)
    router.push({ name: 'topics' })
}
</script>