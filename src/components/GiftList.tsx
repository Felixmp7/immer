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

    .add-new-gift {
        padding: 1rem 0;
        text-align: right;
    }
`;

const GiftList = (): JSX.Element => {
    const {
        users, gifts, currentUser, addGift, reserveGift,
    } = useGift();

    return (
        <ListContainer>
            <h1>{`Hi, ${currentUser?.name}`}</h1>
            <div className="add-new-gift">
                <ButtonStyled type="button" onClick={addGift}>Add new gift</ButtonStyled>
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
