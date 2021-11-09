import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useImmer } from 'use-immer';
import { addBook, getBookDetails, handleReserve } from 'src/services';
import useSession from './useSession';

const useGift = () => {
    const { getInitialState } = useSession();
    const [state, updateState] = useImmer(getInitialState());
    const { users, gifts, currentUser } = state;

    const addGift = useCallback(() => {
        const description = prompt('Gift to add');
        if (description) {
            updateState((draft) => {
                draft.gifts.push({
                    id: uuidv4(),
                    description,
                    image: 'https://picsum.photos/200',
                    reservedBy: undefined,
                });
            });
        }
    }, [updateState]);

    const reserveGift = useCallback((giftId: string) => {
        updateState((draft) => {
            const found = draft.gifts.find((gift) => gift.id === giftId);
            if (found) {
                found.reservedBy = handleReserve(draft, found);
            }
        });
    }, [updateState]);

    const resetGifts = useCallback(() => updateState(() => getInitialState()),
        [getInitialState, updateState]);

    const handleAddBook = async () => {
        const isbn = prompt('Enter ISBN number', '0201558025');
        if (isbn) {
            const book = await getBookDetails(isbn);
            if (book) updateState((prevState) => addBook(prevState, book));
        }
    };

    return {
        users, gifts, currentUser, addGift, reserveGift, resetGifts, handleAddBook,
    };
};

export default useGift;
