import { defineStore } from "pinia";
import { ref } from "vue";

const defaultTask: BaseTask = {
    
}
export const useTopicTasksStore = defineStore('topicTasks', () => {
    const currentTask = ref()
})