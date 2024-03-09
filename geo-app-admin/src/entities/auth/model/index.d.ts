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

export interface AuthModelState {
    user: User;
    isAuth: boolean;
    signIn: (login: string, password: string) => Promise<void>;
    signUp: (login: string, password: string) => Promise<void>;
    getCurrentUser: () => Promise<boolean>;
    logout: () => void;
}