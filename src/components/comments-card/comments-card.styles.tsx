import styled from "styled-components";

export const CommentsCardBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.palette.black};
    flex-direction: column;
    width: 100%;
    min-height: 300px;

    & > * {
        background-color: ${({ theme }) => theme.palette.black};
    }

    h2 {
        margin: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${({ theme }) => theme.palette.black};
        color: ${({ theme }) => theme.palette.gold};
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        img {
            width: 50px;
            height: 50px;
        }
    }
`;

export const CommentsCardTextEdiBox = styled.div`
    button {
        margin: 10px;
        border-radius: 20px;
        height: 40px;
        cursor: pointer;
        padding: 10px;
    }

    button:nth-child(2) {
        background-color: ${({ theme }) => theme.palette.gold};
    }

    button:last-child {
        margin-bottom: 30px;
        background-color: grey;
    }
`;

export const CommentsCardTextEditArea = styled.textarea`
    border-radius: 20px;
    padding: 10px;
    height: 100px;
    width: 100%;
    margin-top: 20px;
`;

export const CommentsCardTextArea = styled.textarea`
    border-radius: 20px;
    padding: 20px;
    height: 100px;
    width: 100%;
`;

export const CreateCommentButton = styled.button`
    background-color: ${({ theme }) => theme.palette.gold};
    cursor: pointer;
    border-radius: 20px;
    width: 200px;
    height: 50px;
    margin: 20px;

    &:hover {
        background-color: 0 5px 10px 0 ${({ theme }) => theme.palette.white};
    }
`;

export const CommentCard = styled.div`
    width: 100%;
    min-height: 100px;
    border: 1px solid ${({ theme }) => theme.palette.gold};
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 30px;
`;

export const CommentCardContent = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const CommentCardAvatar = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    height: 100%;

    span {
        margin-top: 10px;
        margin-left: 10px;
    }
`;

export const CommentCardContentText = styled.div`
    width: 70%;
    padding: 20px;

    @media ${(props) => props.theme.breakpoints.lg} {
        width: 50%;
    }
`;

export const CommentCardContentButtons = styled.div<{ isComment?: boolean }>`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    width: 30%;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
        border-radius: 20px;
        height: 40px;
        cursor: pointer;
        padding: 10px;
    }

    button:hover {
        background-color: 0 5px 10px 0 ${({ theme }) => theme.palette.white};
    }

    button:nth-child(1) {
        background-color: forestgreen;
        width: 120px;

        @media ${(props) => props.theme.breakpoints.lg} {
            width: 60px;
        }
    }

    button:nth-child(2) {
        background-color: red;
        width: 130px;
        @media ${(props) => props.theme.breakpoints.lg} {
            width: 60px;
        }
    }

    button:nth-child(3) {
        background-color: dodgerblue;
        width: 100px;
        @media ${(props) => props.theme.breakpoints.lg} {
            width: 60px;
        }
    }

    button:nth-child(4) {
        background-color: ${({ isComment, theme }) =>
            isComment ? theme.palette.gold : "red"};
        width: ${({ isComment }) => (isComment ? "100px" : "")};

        img {
            background-color: red;
        }

        @media ${(props) => props.theme.breakpoints.lg} {
            width: 60px;
        }
    }

    button:nth-child(5) {
        background-color: ${({ isComment }) => (isComment ? "red" : "")};

        img {
            background-color: red;
        }
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        display: flex;
        flex-direction: column;

        button {
            font-size: 12px;

            img {
                height: 15px;
            }
        }
    }
`;

export const CommentReplyBox = styled.div`
    margin-top: 30px;
    width: 80%;

    button {
        margin: 10px;
        border-radius: 20px;
        height: 40px;
        cursor: pointer;
        padding: 10px;
    }

    button:nth-child(2) {
        background-color: ${({ theme }) => theme.palette.gold};
    }

    button:last-child {
        margin-bottom: 30px;
        background-color: grey;
    }
`;

export const CommentCardRepliesBox = styled.div`
    margin-top: 20px;
    width: 80%;
    margin-left: 60px;
`;
