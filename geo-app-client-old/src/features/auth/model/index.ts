import { User, useUserModel } from "@entities/user";
import { axiosInstance } from "@shared";
import { create } from "zustand";

interface AuthModel {
    isAuth: boolean;
    checkAuth: () => Promise<boolean>;
    signIn: (login: string, password: string) => Promise<void>;
    signUp: (login: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthModel = create<AuthModel>((set) => ({
    isAuth: false,
    checkAuth: async () => {
        const getCurrentUser = useUserModel.getState().getCurrentUser;
        const isAuth = await getCurrentUser();
        
        set({ isAuth });
        return isAuth
    },
    signIn: async (login, password) => {
        const setUser = useUserModel.getState().setUser;
        const response = await axiosInstance.post<User>('/auth/sign-in', { login, password });
        const user = response.data;
        set({ isAuth: true })
        setUser(user);
        localStorage.setItem('token', user.token);
    },
    signUp: async (login, password) => {
        const setUser = useUserModel.getState().setUser;
        const response = await axiosInstance.post<User>('/auth/sign-up', { login, password });
        const user = response.data;
        set({ isAuth: true });
        setUser(user);
        localStorage.setItem('token', user.token);
    },
    logout: () => {
        const resetUser = useUserModel.getState().resetUser;
        localStorage.removeItem('token');
        set({ isAuth: false });
        resetUser()
    },
}));