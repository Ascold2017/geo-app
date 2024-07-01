<template>
    <div class="d-flex">
        <button
            @mousedown="startRecording"
            @mouseup.native="stopRecording"
            class="mr-3">
            <v-icon>{{ isRecording ? 'mdi-loading' : 'mdi-microphone' }}</v-icon>
        </button>
        <audio :src="value" controls></audio>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ value: string; }>()
const emit = defineEmits<{ change: [payload: string] }>()

const isRecording = ref(false);
const mediaRecorder = ref<MediaRecorder | null>(null);
const audioChunks: Blob[] = [];

const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder.value = new MediaRecorder(stream);
    mediaRecorder.value.start();
    mediaRecorder.value.ondataavailable = (event) => {
        audioChunks.push(event.data);
    };
    mediaRecorder.value.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
            emit('change', reader.result as string);
        };
        audioChunks.length = 0; // Очищаем массив после записи
    };
    isRecording.value = true;
};

const stopRecording = () => {
    if (mediaRecorder.value) {
        mediaRecorder.value.stop();
        mediaRecorder.value.stream.getTracks().forEach(track => track.stop());
    }
    isRecording.value = false
};
</script>