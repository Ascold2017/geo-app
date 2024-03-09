import { http } from "@shared";
import { BaseTopic, BaseTopicWithTasks } from "../model/index.d";

export const getTopics = async () => {
    const data = (await http<BaseTopic[]>({ url: '/adm/sections/topics' })).data;
    return data
}
export const getTopic = async (id: number) => (await http<BaseTopicWithTasks>({ url: '/adm/sections/topics/' + id })).data;
export const postTopic = async (item: Omit<BaseTopic, 'id'>) => (await http<BaseTopic>({ url: '/adm/sections/topics', method: 'POST', data: item })).data;

export const patchTopic = async (id: number, item: Omit<BaseTopic, 'id'>) => (await http<BaseTopic>({ url: '/adm/sections/topics/' + id, method: 'PATCH', data: item, })).data;

export const deleteTopic = async (id: number) => (await http<{ ok: boolean }>({ method: 'DELETE', url: '/adm/sections/topics/' + id })).data;