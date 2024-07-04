<template>
    <v-container>
       <h3 class="text-center mb-6">{{ topicWithTasks.title }}</h3>

       <v-card class="mb-6">
            <v-card-text>
                {{ topicWithTasks.text }}
            </v-card-text>
       </v-card>

       <div class="d-flex ga-2 justify-center">
           <v-btn :to="{ name: 'topicIndex', params: { id: route.params.id } }">
               <v-icon>mdi-arrow-left</v-icon>
               Покинуть урок
           </v-btn>
           <v-btn :to="{ name: 'topicVideo', params: { id: route.params.id } }">
               Видео-урок
               <v-icon>mdi-arrow-right</v-icon>
           </v-btn>
       </div>
    </v-container>
</template>

<script setup lang="ts">
import { useTopicStore } from '@/stores/topic/topic';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const topicStore = useTopicStore()
const { topicWithTasks } = storeToRefs(topicStore)

onMounted(() => {
   topicStore.getTopic(+route.params.id as number)
})
</script>