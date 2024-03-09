import { create } from 'zustand';
import axiosInstance from '@utils/axios';
import { User } from '@common/constants/types';


type State = {
    user: User;
    isAuth: boolean;
    signIn: (login: string, password: string) => Promise<void>;
    signUp: (login: string, password: string) => Promise<void>;
    getCurrentUser: () => Promise<boolean>;
    logout: () => void;
};

const defaultUser = {
    token: "",
    id: 0,
    username: "",
    role: 'user',
    isPremium: false,
    registeredAt: new Date()
}
const useAuth = create<State>((set) => ({
    user: Object.create(defaultUser),
    isAuth: false,
    signIn: async (login, password) => {
        try {
            const response = await axiosInstance.post<User>('/users/sign-in', { login, password });
            const user = response.data;
            set({ user, isAuth: true });
            localStorage.setItem('token', user.token);
        } catch (error) {
            set({ user: Object.create(defaultUser), isAuth: false });
        }
    },
    signUp: async (login, password) => {
        try {
            const response = await axiosInstance.post<User>('/users/sign-up', { login, password });
            const user = response.data;
            set({ user, isAuth: true });
            localStorage.setItem('token', user.token);
        } catch (error) {
            set({ user: Object.create(defaultUser), isAuth: false });
        }
    },
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
}));

export default useAuth;
