import styled from "styled-components";

export const GroupCardLink = styled.a`
    width: 100%;
`;

export const GroupCardContainer = styled.div`
    display: flex;
    margin: 40px;
    height: 150px;
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
    & * {
        background-color: white;
    }
    &:hover {
        box-shadow: 0 0 20px #fff;
    }
`;

export const GroupCardTitle = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    margin-left: 10px;
    p {
        color: black;
    }

    p:nth-child(1) {
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 5px;
    }
`;

export const GroupCardImage = styled.div`
    width: 90%;
    height: 80px;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
    }
`;

export const GroupCardDescription = styled.div`
    margin: 10px 0 0 10px;

    span {
        color: black;
    }
`;
