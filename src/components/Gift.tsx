import { FC, memo } from 'react';
import useGift from 'src/hooks/useGift';
import styled from 'styled-components';
import { IGift, IUser } from 'types';
import ButtonStyled from './styled/Button';

const ContainerGift = styled.div<{ isReserved: boolean }>`
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;

    > img {
        height: 80px;
        width: 80px;
        object-fit: cover;
        border: 4px solid orange;
        border-radius: 80px;
    }

    .description {
        text-align: center;
        flex-grow: 1;
        text-decoration: ${({ isReserved }) => (isReserved ? 'line-through' : 'none')};
        color: ${({ isReserved }) => (isReserved ? 'gray' : '#00b3b3')};
    }

    .reservation {
        width: 120px;
        text-align: center;

        span {
            font-size: 30pt;

            &::before {
                content: "reserved by";
                font-size: 12pt;
                color: gray;
            }
        }
    }
`;

interface IGiftProps {
    gift: IGift;
    users: Array<IUser>;
}

const Gift: FC<IGiftProps> = memo(({ gift, users }) => {
    const { currentUser, handleReserve } = useGift();

    return (
        <ContainerGift isReserved={!!(gift.reservedBy)}>
            <img src={gift.image} alt="gift" />
            <h2 className="description">{gift.description}</h2>
            <div className="reservation">
                {!gift.reservedBy || gift.reservedBy === currentUser?.id ? (
                    <ButtonStyled
                        type="button"
                        color="#2b6aa5"
                        onClick={() => handleReserve(gift.id)}
                    >
                        {gift.reservedBy ? 'Unreserve' : 'Reserve'}
                    </ButtonStyled>
                ) : (
                    <span>{users[gift.reservedBy].name}</span>
                )}
            </div>
        </ContainerGift>
    );
});

Gift.displayName = 'Gift';

export default Gift;
