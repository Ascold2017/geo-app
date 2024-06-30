import type { Dayjs } from "dayjs";

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

export interface ParsedUser {
    id: number;
    username: string
    isPremium: boolean
    registeredAt: Dayjs
}