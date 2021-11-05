export interface IGift {
    id: string;
    description: string;
    image: string;
    reservedBy: undefined | number;
}

export interface IUser {
    id: number;
    name: string;
}

export interface IState {
    users: IUser[],
    currentUser: IUser
    gifts: IGift[],
}
