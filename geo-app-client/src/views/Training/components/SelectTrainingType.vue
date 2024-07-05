<template>
    <section class="d-flex flex-column align-center">
        <p class="mb-3 text-center">Выберите вид тренировки</p>
        <v-btn v-for="training in trainingList" block class="mb-3" @click="emit('selectTraining', training.trainingTypes)">
            <v-icon v-if="training.icon">{{ training.icon }}</v-icon>
            {{ training.title }}
        </v-btn>
    </section>
</template>

<script setup lang="ts">
import { TrainingTypes } from '@/models/training.model';

const emit = defineEmits<{ selectTraining: [payload: TrainingTypes[]] }>()
const trainingList = [
    {
        icon: '',
        title: 'Смешанный',
        trainingTypes: [
            TrainingTypes.COMPOSE,
            TrainingTypes.COMPOSE_REVERT,
            TrainingTypes.LISTENING,
            TrainingTypes.SPEAKING,
            TrainingTypes.WRITING,
            TrainingTypes.WRITING_REVERT
        ]
    },
    {
        icon: '',
        title: 'Простой',
        trainingTypes: [
            TrainingTypes.COMPOSE,
            TrainingTypes.COMPOSE_REVERT,
        ]
    },
    {
        icon: '',
        title: 'Письмо',
        trainingTypes: [
            TrainingTypes.WRITING,
            TrainingTypes.WRITING_REVERT
        ]
    },
    {
        icon: '',
        title: 'Прослушивание',
        trainingTypes: [
            TrainingTypes.LISTENING,
        ]
    },
    {
        icon: '',
        title: 'Говорение',
        trainingTypes: [
            TrainingTypes.SPEAKING,
        ]
    },
]
</script>