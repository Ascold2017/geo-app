import { create } from 'zustand';
import { getUsers } from '../api';
import {UserModelState} from './index.d';

export const useUserModel = create<UserModelState>((set) => ({
    users: [],
    loading: false,
    getUsers: async () => {
        set({ loading: true });
        const users = await getUsers();
        set({ users, loading: false });
    }
}))