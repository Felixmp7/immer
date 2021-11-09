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

export const handleReserve = (draft: IState, giftFound: IGift): number | undefined => {
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

export const getBookDetails = async (isbn: string) => {
    try {
        const response = await fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`, {
            mode: 'cors',
        });
        const book = (await response.json())[`ISBN:${isbn}`];
        return book;
    } catch (error) {
        return undefined;
    }
};

export const addBook = produce((draft, book) => {
    draft.gifts.push({
        id: book.isbn,
        description: book.title,
        image: book.cover.medium,
        reservedBy: undefined,
    });
});
