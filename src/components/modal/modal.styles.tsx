import styled from "styled-components";

export const ModalContainer = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

export const ModalContent = styled.div<{ isAdmin?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: ${({ theme }) => theme.colors.black};
    border: 1px solid #b77d30;
    padding: 20px;
    border-radius: 8px;
    max-width: ${({ isAdmin }) => (isAdmin ? "800px" : "1500px")};
    width: 100%;
    text-align: center;

    button:nth-child(2) {
        position: absolute;
        top: 10px;
        right: 10px;
        border-radius: 50%;
        cursor: pointer;
        padding: 0;
        border: 1px solid #b77d30;

        img {
            display: block;
            width: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    }

    button:nth-child(2):hover {
        box-shadow: 0 0 20px ${({ theme }) => theme.colors.white};
    }
`;
