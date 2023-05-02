import styled from "styled-components";

export const MainBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 100px;
    margin-bottom: 100px;
    justify-content: space-around;
    align-items: center;
    height: 550px;
    gap: 20px;

    @media ${(props) => props.theme.breakpoints.xl} {
        transition: margin-top 0.3s ease-in-out;
        margin-top: 40px;
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        transition: margin-top 0.3s ease-in-out;
        margin-top: 30px;
        height: 450px;
        margin-bottom: 30px;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        transition: flex-direction 0.3s ease-in-out;
        margin-top: 80px;
        flex-direction: column-reverse;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        height: 450px;
    }
`;

export const MainLeft = styled.div`
    flex: 1;
    border: 3px outset #393f484d;
    border-radius: 30px;
    margin-left: 30px;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 30px;
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        margin-left: 20px;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        width: 95%;
    }
`;

export const MainRight = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    @media ${(props) => props.theme.breakpoints.md} {
        margin-bottom: 25px;
        width: 100%;
    }
`;

export const Title = styled.span`
    display: flex;
    font-size: 50px;
    color: #eaaf57;
    font-weight: 700;
    height: 100px;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    text-align: center;

    @media ${(props) => props.theme.breakpoints.lg} {
        font-size: 40px;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        margin-top: 0;
        font-size: 25px;
    }
`;

export const Description = styled.div`
    font-size: 30px;
    height: 40%;
    line-height: 35px;
    max-width: 650px;
    text-align: center;
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    margin-left: 10px;
    margin-right: 10px;

    @media ${(props) => props.theme.breakpoints.lg} {
        font-size: 25px;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        font-size: 20px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        font-size: 17px;
        margin-bottom: 0;
    }
`;

export const CardsTitle = styled.div`
    text-align: center;
    margin-bottom: 20px;
    font-size: 25px;
    font-weight: bold;
    color: #eaaf57;

    @media ${(props) => props.theme.breakpoints.md} {
        margin-top: 170px;
        font-size: 22px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        margin-top: 100px;
        font-size: 20px;
    }
`;

export const Cards = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 800px;

    @media ${(props) => props.theme.breakpoints.lg} {
        display: flex;
        align-items: center;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        flex-direction: column;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }
`;

export const Card = styled.div`
    border-radius: 8px;
    box-shadow: 1px 5px 1px 5px #393f484d;
    height: 250px;
    width: calc(25% - 24px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;

    &:hover {
        box-shadow: 0px 5px 10px 0px #fff;
        transform: translateX(-50%);
        animation: jump 0.5s ease-in-out infinite alternate;
    }

    @keyframes jump {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-10px);
        }
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        height: 250px;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        width: calc(100% - 24px);
        height: 150px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        width: calc(100% - 24px);
        height: 100px;
    }
`;

export const CardText = styled.div`
    margin-top: 20px;
    font-size: 22px;

    @media ${(props) => props.theme.breakpoints.md} {
        font-size: 20px;
    }
    @media ${(props) => props.theme.breakpoints.sm} {
        font-size: 15px;
        margin-bottom: 10px;
    }
`;

export const CardsRow = styled.div`
    display: flex;
    flex-basis: 100%;
    width: 50%;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 16px;

    @media ${(props) => props.theme.breakpoints.lg} {
        height: 200px;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        flex-direction: column;
        margin-bottom: 8px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        margin-bottom: 8px;
    }
`;
