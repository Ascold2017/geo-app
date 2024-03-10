import { create } from "zustand";
import { axiosInstance } from "@shared";
import { User } from "@entities/user";
import { changeUserSection } from "@app/api";

interface AppModelState {
    user: User;
    isAuth: boolean;
    getCurrentUser: () => Promise<boolean>;
    logout: () => void;
    setUser: (user: User) => void;
    changeSection: (sectionId: number) => Promise<void>;
}

const defaultUser = {
    token: "",
    id: 0,
    username: "",
    role: 'user',
    isPremium: false,
    registeredAt: new Date()
}

export const useAppModel = create<AppModelState>((set, get) => ({
    user: Object.create(defaultUser),
    isAuth: false,
    async getCurrentUser() {
        const token = localStorage.getItem('token')
        if (!token) return false;
        try {
            const user = (await axiosInstance.request<User>({ url: '/users/' + token, method: 'GET' })).data;
            set({ user, isAuth: true });
            return true
        } catch {
            return false
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: Object.create(defaultUser), isAuth: false });
    },
    setUser: (user) => set({ user, isAuth: true }),
    changeSection: async (sectionId) => {
        const changeUserSectionReq = changeUserSection();
        await changeUserSectionReq(sectionId);
        await get().getCurrentUser();
    },
}))