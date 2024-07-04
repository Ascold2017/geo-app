import { TaskTypesEnum, type UserTask } from "@/models/task.model";
import _ from "lodash";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useTopicStore } from "./topic";
import { httpClient } from "@/adapters/httpClient";

export const useTopicWordsStore = defineStore('topic/words', () => {
    const topicStore = useTopicStore();
    const { topicWithTasks } = storeToRefs(topicStore)

    const tasks = computed(() => topicWithTasks.value.tasks.filter(task => task.type === TaskTypesEnum.WORD))

    const currentTaskId = ref<number | null>(null)

    const currentTask = computed(() => tasks.value.find(t => t.id === currentTaskId.value))
    const isHasNextTask = computed(() => {
        const indexOfCurrentTask = tasks.value.findIndex(task => task.id === currentTaskId.value);
        return indexOfCurrentTask < tasks.value.length -1
    })

    $reset()

    watch(tasks, () => {
        console.log(tasks.value)
        $reset()
    })


    async function nextWord() {
        await checkReadedWord()
        const indexOfCurrentTask = tasks.value.findIndex(task => task.id === currentTaskId.value);
        const nextTask = tasks.value[indexOfCurrentTask + 1];
        if (nextTask) {
            currentTaskId.value = nextTask.id;
        }
    }

    async function checkReadedWord() {
        try {
            await httpClient.request({
                url: '/learn/read-task/'+ currentTask.value?.id,
                method: 'POST'
            })
        } catch {
            return Promise.reject(false)
        }
    }

    function $reset() {
        currentTaskId.value = tasks.value[0]?.id || null;
    }

    return {
        currentTask,
        isHasNextTask,
        nextWord,
        $reset
    }
})