<template>
    <v-text-field label="Название темы" v-model="topic.title" />
    <v-textarea label="Текст темы" v-model="topic.text" />
    <v-text-field label="Ccылка на Youtube-видеоурок" v-model="youtubeId" />
    <div class="d-flex">
        <v-select class="flex-1" label="Секция" :items="sectionsStore.sections" item-value="id" item-text="title" v-model="topic.sectionId"/>
        <v-divider class="mx-2" inset vertical />
        <v-switch class="flex-1" label="Для премиум-пользователей" v-model="topic.isPremium" />
    </div>
</template>

<script setup lang="ts">
import { youtubeLinkParser } from '@/assets/youtubeLinkParser';
import { useSectionsStore } from '@/stores/sections/sections';
import { useTopicStore } from '@/stores/topics/topic';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const topicStore = useTopicStore()
const sectionsStore = useSectionsStore()
const { topic } = storeToRefs(topicStore)

const youtubeId = computed({
    get() {
        return topic.value.videoId ? `https://www.youtube.com/embed/${topic.value.videoId}` : '';
    },
    set(v) {
        topic.value.videoId = youtubeLinkParser(v) as string;
    }
})
</script>