import _ from 'lodash';
import { create } from 'zustand'
import { useTasksModel } from '@entities/tasks';
import { deleteTopic, getTopic, getTopics, patchTopic, postTopic } from '../api'
import { BaseTopic, TopicsModelState } from './index.d'

const defaultTopic: BaseTopic = {
    id: 0,
    title: '',
    text: '',
    videoId: '',
    sectionId: 0,
    isPremium: false
};

export const useTopicsModel = create<TopicsModelState>((set, get) => ({
    topics: [],
    loading: false,
    getTopics: async () => {
        set({ loading: true })
        const topics = await getTopics()
        set({ topics, loading: false })
    },
    deleteTopic: async (id) => {
        await deleteTopic(id)
        set(state => ({ topics: state.topics.filter(topic => topic.id !== id) }))
    },
    isNew: true,
    topic: defaultTopic,
    getTopic: async (id: number) => {
        set({ loading: true });
        const { tasks, ...topic } = await getTopic(id);
        set({
            topic: topic as BaseTopic,
            loading: false,
            isNew: false
        });
        useTasksModel.getState().setTasks(tasks.map(task => ({ ...task, _intId: task.id.toString() })));
    },

    setTopicValue: (field, value) => {
        set(state => ({ topic: { ...state.topic, [field]: value } }));
    },

    saveTopic: async () => {
        const { isNew, topic } = get();

        set({ loading: true });
        if (isNew) {
            const { id } = await postTopic(_.omit(topic, 'id', 'tasks'));
            await useTasksModel.getState().saveTasks(id);
            set({ loading: false });
            return id;
        } else {
            await patchTopic(topic.id, _.omit(topic, 'id', 'tasks'));
            await useTasksModel.getState().saveTasks(topic.id);
            set({ loading: false });
            get().getTopic(topic.id);
            return topic.id;
        }
    },

    
}))