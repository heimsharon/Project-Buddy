export interface UserData {
    id: string | null;
    username: string | null;
    email: string | null;
    avatar?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserLogin {
    username: string | null;
    password: string | null;
}
