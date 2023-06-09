import React, { ChangeEvent, useState } from "react";
import { Comment } from "../../types/comment";

export type TCommentProps = {
    comment: Comment;
    handleEdit: (content: string) => void;
};
const Comment = ({ comment, handleEdit }: TCommentProps) => {
    const [commentContentEdited, setCommentContentEdited] = useState(
        comment?.content,
    );
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userVote, setUserVote] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    const handleLike = () => {
        if (userVote === "like") {
            setLikes((prevLikes) => prevLikes - 1);
            setUserVote(null);
        } else {
            setLikes((prevLikes) => prevLikes + 1);
            setUserVote("like");
            if (userVote === "dislike") {
                setDislikes((prevDislikes) => prevDislikes - 1);
            }
        }
    };
    const handleDislike = () => {
        if (userVote === "dislike") {
            setDislikes((prevDislikes) => prevDislikes - 1);
            setUserVote(null);
        } else {
            setDislikes((prevDislikes) => prevDislikes + 1);
            setUserVote("dislike");
            if (userVote === "like") {
                setLikes((prevLikes) => prevLikes - 1);
            }
        }
    };
    const onEditClick = () => {
        setIsEdit(true);
    };
    const onSaveClick = () => {
        handleEdit(commentContentEdited);
        setIsEdit(false);
    };
    const onCancelClick = () => {
        setIsEdit(false);
        setCommentContentEdited(comment?.content);
    };
    const handleChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
        setCommentContentEdited(event.target.value);
    };
    return (
        <div>
            {" "}
            {isEdit ? (
                <div>
                    {" "}
                    <textarea
                        value={commentContentEdited}
                        onChange={() => handleChangeComment}
                    />{" "}
                    <button onClick={onSaveClick}>Zapisz</button>{" "}
                    <button onClick={onCancelClick}>Anuluj</button>{" "}
                    <div>
                        {" "}
                        <button onClick={handleLike}>
                            {" "}
                            Like ({likes}){" "}
                        </button>{" "}
                        <button onClick={handleDislike}>
                            {" "}
                            Dislike ({dislikes}){" "}
                        </button>{" "}
                    </div>
                </div>
            ) : (
                <div>
                    {" "}
                    <p>{comment}</p>{" "}
                    <button onClick={onEditClick}>Edytuj</button>{" "}
                </div>
            )}{" "}
        </div>
    );
};

export default Comment;
