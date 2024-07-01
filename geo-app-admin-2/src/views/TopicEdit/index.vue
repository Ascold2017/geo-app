<template>
  <v-container>
        <v-card :loading="isLoading">
            <TopicEditHeader />
            <TopicEditForm />
            <v-divider />
            <TopicTasksForm />
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import TopicEditHeader from './components/TopicEditHeader.vue'
import TopicEditForm from './components/TopicEditForm.vue'
import TopicTasksForm from './components/TopicTasksForm.vue'
import { useTopicStore } from '@/stores/topics/topic';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSectionsStore } from '@/stores/sections/sections';

const topicStore = useTopicStore()
const sectionsStore = useSectionsStore()
const route = useRoute<{ id?: string }>()
const { isLoading } = storeToRefs(topicStore)
onMounted(() => {
    if (route.params.id) {
        topicStore.getTopicWithTasks(+route.params.id)
    }
    sectionsStore.getSections()
})


</script>