export interface UserData {
    _id: string | null;
    username: string;
    email: string;
    password: string;
    avatar?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserLogin {
    username: string | null;
    password: string | null;
}
