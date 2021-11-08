import styled from 'styled-components';

const ButtonStyled = styled.button<{ color?: string }>`
    background-color: transparent;
    border: ${({ color }) => `2px solid ${color || '#00b3b3'}`};
    border-radius: 1rem;
    padding: .3rem 1.2rem;
    color: ${({ color }) => color || '#00b3b3'};
    font-weight: 600;
    transition: all .5s ease;

    &:hover {
        color: white;
        background-color: ${({ color }) => color || '#00b3b3'};
        cursor: pointer;
    }
`;

export default ButtonStyled;
