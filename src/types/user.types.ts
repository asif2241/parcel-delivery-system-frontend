
export const Role = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    SENDER: "SENDER",
    RECEIVER: "RECEIVER"
} as const

export type Role = typeof Role[keyof typeof Role]

export interface IAuthProvider {
    provider: "google" | "credentials";
    providerId: string;
}

export const isActive = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
} as const
export type isActive = typeof isActive[keyof typeof isActive]

export type IUser = {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    address?: string;
    role: Role;
    isActive?: isActive;
    isBlocked?: boolean;
    blockedBy?: string;
    isVerified?: boolean;
    isDeleted?: boolean;
    auths: IAuthProvider[]
}