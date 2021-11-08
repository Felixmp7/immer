import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addGift, toggleReservation } from 'src/services';
import useSession from './useSession';

const useGift = () => {
    const { getInitialState } = useSession();
    const [state, setState] = useState(getInitialState());
    const { users, gifts, currentUser } = state;

    const handleAdd = useCallback(() => {
        const description = prompt('Gift to add');
        if (description) {
            setState((prevState) => addGift(prevState, uuidv4(), description));
        }
    }, []);

    const handleReserve = useCallback((id: string) => {
        setState((prevState) => toggleReservation(prevState, id));
    }, []);

    return {
        users, gifts, currentUser, handleAdd, handleReserve,
    };
};

export default useGift;
