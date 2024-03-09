import { http } from "@shared";
import { BaseSection } from "../model/index.d";

export const getSections = async () => {
    const response = await http<BaseSection[]>({ url: '/adm/sections' })
    return response.data;
}


export const postSection = async (section: Omit<BaseSection, 'id'>) => (await http<BaseSection>({ method: 'POST', url: '/adm/sections', data: section })).data

export const patchSection = async (id: number, section: BaseSection) => (await http<BaseSection>({ method: 'PATCH', url: '/adm/sections/' + id, data: section })).data


export const deleteSection = async (id: number) => (await http<{ ok: boolean }>({ method: 'DELETE', url: '/adm/sections/' + id })).data

