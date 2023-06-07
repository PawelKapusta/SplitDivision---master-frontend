import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    flex-direction: row;
    width: 70%;
    max-width: 1300px;
    height: 700px;
    border-radius: 20px;
    box-shadow: 0 0 20px ${({ theme }) => theme.palette.gold};

    @media ${(props) => props.theme.breakpoints.lg} {
        width: 90%;
        height: 600px;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        display: flex;
        flex-direction: column;
        width: 90%;
        height: 450px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        width: 90%;
        height: 300px;
    }
`;

export const ImageContainer = styled.div`
    width: 50%;
    padding: 20px;
    border-radius: 20px;

    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        width: 100%;
        height: 100%;
    }
`;

export const CoinContainer = styled.div`
    position: absolute;
    top: 32%;
    left: 39%;
    width: 50px;
    height: 180px;
    z-index: 1;
    background: transparent;
    border: none;
    box-shadow: none;

    img {
        object-fit: contain;
        width: 40px;
        height: 40px;
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        top: 32%;
        left: 36%;

        img {
            width: 35px;
            height: 35px;
        }
    }
    @media ${(props) => props.theme.breakpoints.md} {
        top: 15%;
        left: 62%;
        height: 150px;

        img {
            width: 50px;
            height: 50px;
        }
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        display: none;
    }
`;

export const Coin = styled.img`
    position: absolute;
    animation: coinAnimation 8s infinite;
    border-radius: 50%;
    left: 10%;

    @keyframes coinAnimation {
        0% {
            top: 100%;
            transform: rotateX(0deg);
        }
        50% {
            top: 0;
            transform: rotateX(720deg);
        }
        100% {
            top: 100%;
            transform: rotateX(1440deg);
        }
    }
`;
