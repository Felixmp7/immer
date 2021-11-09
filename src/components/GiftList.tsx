import styled from 'styled-components';
import useGift from 'src/hooks/useGift';
import Gift from './Gift';
import ButtonStyled from './styled/Button';

const ListContainer = styled.div`
    max-width: 880px;
    margin: auto;
    > h1 {
        font-size: 4rem;
        margin: .5rem 0;
        text-align: right;
        color: #00b3b3;
    }

    .actions {
        padding: 1rem 0;
        display: flex;
        justify-content: end;
        align-items: center;

        .mr-button {
            margin-left: 1rem;
        }
    }
`;

const GiftList = (): JSX.Element => {
    const {
        users, gifts, currentUser, addGift, reserveGift, resetGifts, handleAddBook,
    } = useGift();

    return (
        <ListContainer>
            <h1>{`Hi, ${currentUser?.name}`}</h1>
            <div className="actions">
                <ButtonStyled type="button" onClick={addGift}>Add new gift</ButtonStyled>
                <div className="mr-button">
                    <ButtonStyled color="#37a056" type="button" onClick={handleAddBook}>
                        Add book
                    </ButtonStyled>
                </div>
                <div className="mr-button">
                    <ButtonStyled color="#da4d4d" type="button" onClick={resetGifts}>
                        Reset gifts
                    </ButtonStyled>
                </div>
            </div>
            <div>
                {gifts.map((gift) => (
                    <Gift
                        key={gift.id}
                        gift={gift}
                        users={users}
                        currentUser={currentUser}
                        reserveGift={reserveGift}
                    />
                ))}
            </div>
        </ListContainer>
    );
};

export default GiftList;
