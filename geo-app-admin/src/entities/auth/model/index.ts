import { create } from 'zustand';
import { http } from '@shared';
import { AuthModelState, User } from './index.d';

const defaultUser = {
    token: "",
    id: 0,
    username: "",
    role: 'user',
    isPremium: false,
    registeredAt: new Date()
}
export const useAuthModel = create<AuthModelState>((set) => ({
    user: Object.create(defaultUser),
    isAuth: false,
    async getCurrentUser() {
        const token = localStorage.getItem('token')
        if (!token) return false;
        try {
            const user = (await http.request<User>({ url: '/auth/' + token, method: 'GET' })).data;
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
