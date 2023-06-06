import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    margin: auto;
`;

export const BackButton = styled.button`
    display: flex;
    flex-direction: row;
    cursor: pointer;
    border-radius: 20px;
    height: 30px;
    margin: 10px;
    align-items: center;
    justify-content: space-around;
    font-size: 15px;
    padding-right: 5px;
    background: transparent;
    border: none;
    box-shadow: none;
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 0 20px #c0c0c0;
    }
    img {
        border-radius: 50%;
        width: 20px;
        fill: ${({ theme }) => theme.colors.gold};
    }
`;
