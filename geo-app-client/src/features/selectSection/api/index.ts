import { axiosInstance } from "@shared";

export const changeUserSection = () => async (sectionId: number) => (await axiosInstance<{ ok: boolean }>({ method: 'POST', url: '/users/change-section', data: { sectionId } })).data;