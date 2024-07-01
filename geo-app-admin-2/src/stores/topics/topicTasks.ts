import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { type BaseTask, type IntTask, TaskTypesEnum } from '@/models/tasks.model'
import _ from 'lodash'
import { useTopicStore } from "./topic";
const defaultTask: IntTask = {
    _intId: 'new',
    id: 0,
    type: TaskTypesEnum.WORD,
    ka: '',
    ru: '',
    transcription: '',
    soundUrl: '',
    imageUrl: '',
}
export const useTopicTasksStore = defineStore('topicTasks', () => {
    const topicStore = useTopicStore();
    
    const currentTask = ref(_.clone(defaultTask))
    const originalTask = ref(_.clone(defaultTask))

    const isNewTask = computed(() => currentTask.value._intId === 'new')
    const isChanged = computed(() => !_.isEqual(currentTask.value, originalTask.value))

    function selectTask(taskId: number) {
        const task = topicStore.topic.tasks.find(task => task.id === taskId);
        if (task) {
            currentTask.value = _.clone({
                ...task,
                _intId: 'edit'
            });
        }
    }

    function resetTask() {
        currentTask.value = _.clone(defaultTask);
    }

    function saveTask() {

    }

    function deleteTask() {

    }

    return {
        currentTask,
        isChanged,
        isNewTask,
        selectTask,
        saveTask,
        deleteTask,
        resetTask
    }
})