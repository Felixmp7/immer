import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useImmer } from 'use-immer';
import { handleReserve } from 'src/services';
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

    return {
        users, gifts, currentUser, addGift, reserveGift, resetGifts,
    };
};

export default useGift;
