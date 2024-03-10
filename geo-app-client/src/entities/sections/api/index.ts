import { axiosInstance } from "@shared";
import { UserSection } from "../model";

export const getSections =  async () => (await axiosInstance<UserSection[]>({ url: '/sections'})).data;