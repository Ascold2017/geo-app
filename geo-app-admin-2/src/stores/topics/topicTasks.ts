import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { TaskTypesEnum, type BaseTask, type BaseTaskPayload } from '@/models/tasks.model'
import _ from 'lodash'
import { httpClient } from "@/adapters/httpClient";
const defaultTask: BaseTask = {
    id: 0,
    type: TaskTypesEnum.WORD,
    ka: '',
    ru: '',
    transcription: '',
    soundUrl: '',
    imageUrl: '',
}
export const useTopicTasksStore = defineStore('topicTasks', () => {

    const isLoading = ref(false);
    const tasks = ref<BaseTask[]>([])
    const currentTask = ref<BaseTask>(_.clone(defaultTask))
    const originalTask = ref<BaseTask>(_.clone(defaultTask))

    const isNewTask = computed(() => currentTask.value.id === 0)
    const isChanged = computed(() => !_.isEqual(currentTask.value, originalTask.value))

    async function getTasks(topicId: number) {
        isLoading.value = true;
        try {
            const data = await httpClient.request<undefined, BaseTask[]>({
                url: '/adm/topics/' + topicId + '/tasks'
            })
            tasks.value = data;
        } finally {
            isLoading.value = false;
        }
    }

    function selectTask(taskId: number) {
        const task = tasks.value.find(t => t.id === taskId)
        if (task) {
            currentTask.value = _.clone(task);
            originalTask.value = _.clone(task)
        }
    }

    function resetTask() {
        currentTask.value = _.clone(defaultTask);
    }

    async function saveTask(topicId: number) {
        isLoading.value = true;
        try {
            if (isNewTask.value) {
                const data = await httpClient.request<BaseTaskPayload, BaseTask>({
                    method: 'POST',
                    url: '/adm/topics/' + topicId + '/tasks',
                    data: _.omit(currentTask.value, 'id')
                })
                tasks.value.push(data)
                
            } else {
                const data = await httpClient.request<BaseTaskPayload, BaseTask>({
                    method: 'PATCH',
                    url: '/adm/topics/' + topicId + '/tasks/' + currentTask.value.id,
                    data: _.omit(currentTask.value, 'id')
                })
                tasks.value = tasks.value.map(t => t.id === currentTask.value.id ? data : t)
            }
            resetTask();
        } finally {
            isLoading.value = false
        }
    }

    async function deleteTask(topicId: number) {
        isLoading.value = true;
        try {
            await httpClient.request<undefined, undefined>({
                method: 'DELETE',
                url: '/adm/topics/' + topicId + '/tasks/' + currentTask.value.id,
            })
            tasks.value = tasks.value.filter(t => t.id !== currentTask.value.id)
            resetTask();
        } finally {
            isLoading.value = false;
        }
    }

    function $reset() {
        resetTask();
        tasks.value = []
    }
    
    return {
        isLoading,
        tasks,
        currentTask,
        isChanged,
        isNewTask,
        getTasks,
        selectTask,
        saveTask,
        deleteTask,
        resetTask,
        $reset
    }
})

