import { defineStore, storeToRefs } from "pinia";
import { useTrainingStore } from "./training";
import { TrainingTypes } from "@/models/training.model";
import { isMatchQA } from "@/utils/stringUtils";
import { computed, ref, watch } from "vue";

export const useSpeakingTrainingStore = defineStore('training/speaking', () => {
    const trainingStore = useTrainingStore();
    const { currentTask } = storeToRefs(trainingStore)

    const answerString = ref<string>('')
    const isRecording = ref(false);
    const error = ref<string | null>(null);

    let recognition: SpeechRecognition | null = null;

    const parsedCurrentTask = computed(() => currentTask.value)

    const isSuccess = computed(() => isMatchQA(answerString.value, parsedCurrentTask.value?.ka || ''))

    watch(isSuccess, (v) => {
        if (v) {
            trainingStore.playAudio();
        }
    })

    function next() {
        if (!isSuccess.value) return;
        trainingStore.nextTask()
        answerString.value = ''
    }

    function $reset() {
        answerString.value = ''
        isRecording.value = false;
    }

    // Инициализация SpeechRecognition
    function initSpeechRecognition() {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            throw new Error('Web Speech API не поддерживается в этом браузере.');
        }

        recognition = new SpeechRecognition();
        recognition.lang = 'ka-GE';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            answerString.value = event.results[0][0].transcript;
            isRecording.value = false;
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            error.value = event.error;
            isRecording.value = false;
        };

        recognition.onend = () => {
            isRecording.value = false;
        };
    };

    async function startRecording() {
        answerString.value = '';
        if (!recognition) {
            initSpeechRecognition();
        }

        error.value = null;
        isRecording.value = true;

        recognition?.start();
    };

    function stopRecording() {
        if (isRecording.value) {
            recognition.stop();
            isRecording.value = false
        }

    };

    return {
        parsedCurrentTask,
        answerString,
        isSuccess,
        isRecording,
        startRecording,
        stopRecording,
        next,
        $reset
    }
})