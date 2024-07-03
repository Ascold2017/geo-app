<template>
    <v-card variant="tonal" :to="{ name: 'topicIndex', params: { id: topic.id } }">
        <header class="d-flex align-center px-3">
            <v-icon color="primary" v-if="topic.isPremium" class="mr-3">mdi-palette-swatch</v-icon>
            <v-card-title class="px-0">{{ topic.title }}</v-card-title>
            <v-spacer />
            <v-icon color="primary" v-if="topic.progress === 100">mdi-trophy</v-icon>
            <template v-else>
                <v-progress-circular :model-value="topic.progress" :rotate="360" :size="30" :width="4" color="teal"
                    style="font-size: 0.8rem;">
                    {{ topic.progress }}
                </v-progress-circular> %
            </template>

        </header>


        <v-img height="200px" :src="coverUrl" cover></v-img>
    </v-card>
</template>

<script setup lang="ts">
import type { UserTopic } from '@/models/topic.model'
import { computed } from 'vue';
import Flag from '@/assets/Flag_of_Georgia.svg.webp'
const props = defineProps<{ topic: UserTopic }>()

const coverUrl = computed(() => props.topic.videoId ? `https://img.youtube.com/vi/${props.topic.videoId}/hqdefault.jpg` : Flag)
</script>