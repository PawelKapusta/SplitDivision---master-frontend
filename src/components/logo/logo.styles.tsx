import styled from "styled-components";

export const LogoContainer = styled.div`
    max-width: 200px;
    margin-bottom: 5px;
    border-radius: 45px;
    filter: brightness(120%);

    img {
        display: block;
        border-radius: 45px;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        img {
            transition: transform 0.3s ease;
            transform: scale(0.8);
        }
    }
`;
