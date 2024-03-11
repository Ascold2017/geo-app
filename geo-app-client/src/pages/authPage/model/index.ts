import { create } from 'zustand';
import { axiosInstance } from '@shared';
import { User } from '@entities/user';
import { useAppModel } from '@app/model';


type State = {
    signIn: (login: string, password: string) => Promise<void>;
    signUp: (login: string, password: string) => Promise<void>;
};

export const useAuthModel = create<State>(() => ({

    signIn: async (login, password) => {

        const response = await axiosInstance.post<User>('/users/sign-in', { login, password });
        const user = response.data;
        useAppModel.getState().setUser(user)
        localStorage.setItem('token', user.token);
    },
    signUp: async (login, password) => {
        const response = await axiosInstance.post<User>('/users/sign-up', { login, password });
        const user = response.data;
        useAppModel.getState().setUser(user)
        localStorage.setItem('token', user.token);
    },

}));
