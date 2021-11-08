import { useCallback, useState } from 'react';
import useSession from 'src/hooks/useSession';
import styled from 'styled-components';
import { addGift, toggleReservation } from 'src/services';
import { v4 as uuidv4 } from 'uuid';
import Gift from './Gift';
import ButtonStyled from './styled/Button';

const ListContainer = styled.div`
    max-width: 880px;
    margin: auto;
`;

const Header = styled.div`
    padding: 0;
    > h1 {
        font-size: 4rem;
        margin: .5rem 0;
        text-align: right;
        color: #00b3b3;
    }
`;

const AddNewGift = styled.div`
    padding: 1rem 0;
    text-align: right;
`;

const GiftList = (): JSX.Element => {
    const { getInitialState } = useSession();
    const [state, setState] = useState(() => getInitialState());
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

    return (
        <ListContainer>
            <Header>
                <h1>{`Hi, ${currentUser?.name}`}</h1>
            </Header>
            <AddNewGift>
                <ButtonStyled type="button" onClick={handleAdd}>Add new gift</ButtonStyled>
            </AddNewGift>
            <div className="gifts">
                {gifts.map((gift) => (
                    <Gift
                        key={gift.id}
                        gift={gift}
                        users={users}
                        currentUser={currentUser}
                        onReserve={handleReserve}
                    />
                ))}
            </div>
        </ListContainer>
    );
};

export default GiftList;
