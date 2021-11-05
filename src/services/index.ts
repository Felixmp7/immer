/* eslint-disable no-nested-ternary */
import { IState } from 'types';

export const addGift = (state: IState, id: string, description: string): IState => ({
    ...state,
    gifts: [
        ...state.gifts,
        {
            id,
            description,
            image: 'https://picsum.photos/200',
            reservedBy: undefined,
        },
    ],
});

export const toggleReservation = (state: IState, giftId: string): IState => ({
    ...state,
    gifts: state.gifts.map((gift) => {
        if (gift.id !== giftId) return gift;
        return {
            ...gift,
            reservedBy: gift.reservedBy === undefined
                ? state.currentUser.id
                : gift.reservedBy === state.currentUser.id
                    ? undefined
                    : gift.reservedBy,
        };
    }),
});
