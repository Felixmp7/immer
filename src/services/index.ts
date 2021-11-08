import { IGift, IState } from 'types';
import produce from 'immer';

export const addGift = (state: IState, id: string, description: string): IState => produce(state, (draft) => {
    draft.gifts.push({
        id,
        description,
        image: 'https://picsum.photos/200',
        reservedBy: undefined,
    });
});

const handleReserve = (state: IState, giftFound: IGift): number | undefined => {
    if (!giftFound.reservedBy) return state.currentUser.id;

    if (giftFound.reservedBy === state.currentUser.id) return undefined;

    return giftFound.reservedBy;
};

export const toggleReservation = (state: IState, giftId: string): IState => produce(state, (draft) => {
    const found = draft.gifts.find((gift) => gift.id === giftId);
    if (found) {
        found.reservedBy = handleReserve(state, found);
    }
});
