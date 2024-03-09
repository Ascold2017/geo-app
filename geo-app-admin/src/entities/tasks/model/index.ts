import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand'
import { deleteTask, patchTask, postTask } from '../api';
import { TasksModelState } from './index.d';



export const useTasksModel = create<TasksModelState>((set, get) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),
    saveTasks: async (topicId) => {
        const tasks = get().tasks;
        const tasksToCreate = tasks.filter(ex => ex._intId.endsWith('_toCreate'));
        const tasksToUpdate = tasks.filter(ex => ex._intId.endsWith('_toUpdate'));
        const tasksToDelete = tasks.filter(ex => ex._intId.endsWith('_toDelete'));

        await Promise.all([
            ...tasksToCreate.map(task => postTask(topicId, _.omit(task, '_intId', 'id'))),
            ...tasksToUpdate.map(task => patchTask(topicId, task.id, _.omit(task, '_intId', 'id'))),
            ...tasksToDelete.map(task => deleteTask(topicId, task.id))
        ]);
    },
    markSaveTask: (item) => {
        set(state => {
            if (!item._intId) {
                item._intId = uuidv4() + '_toCreate';
                return { tasks: [...state.tasks, item] };
            } else {
                const updatedTasks = state.tasks.map(task => {
                    if (task._intId === item._intId) {
                        return {
                            ...item,
                            _intId: task._intId.endsWith('_toCreate') ? task._intId : task._intId + '_toUpdate'
                        };
                    }
                    return task;
                });

                return { tasks: updatedTasks };
            }
        });
    },

    markDeleteTask: (intId) => {
        set(state => {
            if (intId.endsWith('_toCreate')) {
                return { tasks: state.tasks.filter(t => t._intId !== intId) };
            } else {
                const updatedTasks = state.tasks.map(task => {
                    if (task._intId === intId) {
                        task._intId = task._intId + '_toDelete';
                    }
                    return task;
                });
                return { tasks: updatedTasks };
            }
        });
    }
}))