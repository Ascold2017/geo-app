import { create } from "zustand";
import { getUser } from "../api";

export interface BaseUser {
    id: number;
    username: string;
    isPremium: boolean;
    registeredAt: Date;
    currentSectionId?: number;
}

export interface User extends BaseUser {
    token: string;
    role: 'user' | 'admin';
}

interface UserModel {
    user: User | null;
    getCurrentUser: () => Promise<boolean>;
    setUser: (user: User) => void;
    resetUser: () => void;

}
export const useUserModel = create<UserModel>(set => ({
    user: null,
    async getCurrentUser() {
        const token = localStorage.getItem('token')
        if (!token) return false;
        try {
            const user = await getUser(token);
            set({ user });
            return true
        } catch {
            return false
        }
    },
    setUser: (user) => set({ user }),
    resetUser: () => set({ user: null })
}));