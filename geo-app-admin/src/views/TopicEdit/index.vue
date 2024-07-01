<template>
  <v-container>
        <v-card :loading="isLoading">
            <TopicEditHeader />
            <TopicEditForm />
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import TopicEditHeader from './components/TopicEditHeader.vue'
import TopicEditForm from './components/TopicEditForm.vue'
import { useTopicStore } from '@/stores/topics/topic';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSectionsStore } from '@/stores/sections/sections';

const topicStore = useTopicStore()
const sectionsStore = useSectionsStore()
// @ts-ignore
const route = useRoute<{ id?: string }>()
const { isLoading } = storeToRefs(topicStore)
onMounted(() => {
    if (route.params.id) {
        topicStore.getTopic(+route.params.id)
    }
    sectionsStore.getSections()
})

onUnmounted(() => {
    topicStore.$reset()
})


</script>