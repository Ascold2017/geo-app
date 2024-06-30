import { http } from "@shared"
import { BaseTask } from "../model/index.d"


export const postTask = async (topicId: number, item: Omit<BaseTask, 'id'>) => (await http<BaseTask>({ url: '/adm/topics/' + topicId + '/tasks', method: 'POST', data: item })).data

export const patchTask = async (topicId: number, id: number, item: Omit<BaseTask, 'id'>) => (await http<BaseTask>({ url: '/adm/topics/' + topicId + '/tasks/' + id, method: 'PATCH', data: item })).data

export const deleteTask = async (topicId: number, id: number) => (await http<BaseTask>({ url: '/adm/topics/' + topicId + '/tasks/' + id, method: 'DELETE', })).data
