import { IGift, IState } from 'types';
import produce from 'immer';

export const addGift = produce((draft: IState, id: string, description: string) => {
    draft.gifts.push({
        id,
        description,
        image: 'https://picsum.photos/200',
        reservedBy: undefined,
    });
});

const handleReserve = (draft: IState, giftFound: IGift): number | undefined => {
    if (!giftFound.reservedBy) return draft.currentUser?.id;

    if (giftFound.reservedBy === draft.currentUser?.id) return undefined;

    return giftFound.reservedBy;
};

export const toggleReservation = produce((draft: IState, giftId: string) => {
    const found = draft.gifts.find((gift) => gift.id === giftId);
    if (found) {
        found.reservedBy = handleReserve(draft, found);
    }
});
