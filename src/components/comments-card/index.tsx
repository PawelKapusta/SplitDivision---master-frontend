import React, { ReactElement, useEffect, useState } from "react";
import { Comment, CommentFormData, Subcomment } from "../../types/comment";
import {
    createComment,
    fetchBillComments,
    selectCommentState,
} from "@redux/slices/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    CommentCard,
    CommentsCardBox,
    CommentsCardTextArea,
    CreateCommentButton,
    CommentCardContent,
    CommentCardContentText,
    CommentCardAvatar,
    CommentCardContentButtons,
    CommentReplyBox,
    CommentsCardTextEditArea,
    CommentsCardTextEdiBox,
} from "@components/comments-card/comments-card.styles";
import Spinner from "@components/spinner";
import { selectUserState } from "@redux/slices/userSlice";
import { User } from "../../types/user";
import { Avatar } from "@styles/pages/admin/admin.styles";
import Image from "next/image";
import { selectAuthState } from "@redux/slices/authSlice";
import { useRouter } from "next/router";
import { TDecodedJWTToken } from "../../types/jwt";
import { getDecodedJWTToken } from "../../utils/jwt";

export type TCommentsCardProps = {
    billId: string;
};

const CommentsCard = ({ billId }: TCommentsCardProps): ReactElement => {
    const { isLoading, error, billComments, isCreateCommentLoading } =
        useSelector(selectCommentState);
    const { isLoading: usersLoading, users } = useSelector(selectUserState);
    const [allComments, setAllComments] = useState<Comment[]>(
        billComments && billComments?.commentsBill,
    );
    const { isAuthenticated, token } = useSelector(selectAuthState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }

    const [newCommentContent, setNewCommentContent] = useState("");
    const [isUserVoted, setIsUserVoted] = useState(false);
    const [commentEditId, setCommentEditId] = useState<string | null>(null);
    const [editedContent, setEditedContent] = useState("");
    const [newSubcommentContent, setNewSubcommentContent] = useState("");
    const dispatch = useDispatch();
    const [commentReplyId, setCommentReplyId] = useState<string | null>(null);
    const [commentReplyContent, setCommentReplyContent] = useState("");
    const addCommentClick = () => {
        if (newCommentContent.trim() !== "" && !isUserVoted) {
            const newCommentData: CommentFormData = {
                content: newCommentContent,
                owner_id: userId,
                bill_id: billId,
            };
            dispatch(createComment(newCommentData));
            console.log(newCommentContent);
            setNewCommentContent("");
        }
    };

    useEffect(() => {
        fetchBillComments(billId as string);
    }, [billId, isCreateCommentLoading]);

    console.log("billComments", billComments);
    console.log("comments", allComments);

    const handleAddReply = (commentId: string) => {
        console.log("reply");
    };

    const handleLikeCommentClick = (index: number) => {
        if (!isUserVoted) {
            const updatedBills = [...allComments];
            updatedBills[index].likes_number += 1;
            setAllComments(updatedBills);
            setIsUserVoted(true);
        }
    };
    const handleDislike = (index: number) => {
        if (!isUserVoted) {
            const updatedBills = [...allComments];
            updatedBills[index].dislikes_number += 1;
            setAllComments(updatedBills);
            setIsUserVoted(true);
        }
    };

    const handleEditComment = (commentId: string) => {
        setCommentEditId(commentId);
        const comment = allComments.find((c) => c.id === commentId);
        if (comment) {
            setEditedContent(comment.content);
        }
    };
    const handleSaveComment = (commentId: string) => {
        const updatedComments = allComments.map((comment) => {
            if (comment.id === commentId) {
                return { ...comment, content: editedContent };
            }
            return comment;
        });
        setAllComments(updatedComments);
        setCommentEditId(null);
    };
    const handleCancelEdit = () => {
        setCommentEditId(null);
        setEditedContent("");
    };

    const handleCancelReply = () => {
        setCommentReplyId(null);
        setCommentReplyContent("");
    };

    const findUserById = (id: string) => {
        return users.find((user: User) => user.id === id);
    };

    const findSubcommentsForThisComment = (id: string) => {
        return (
            billComments &&
            billComments?.subcommentsBill?.filter(
                (subcomment: Subcomment) => subcomment.comment_id === id,
            )
        );
    };

    return (
        <CommentsCardBox>
            {isLoading && usersLoading ? (
                <Spinner isSmall />
            ) : (
                <CommentsCardBox>
                    <h2>Comments</h2>
                    <CommentsCardTextArea
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                    />
                    <CreateCommentButton onClick={addCommentClick}>
                        {isLoading ? "Loading..." : "Add a comment"}
                    </CreateCommentButton>
                    {!isLoading &&
                        !usersLoading &&
                        allComments?.map((comment, index) => (
                            <CommentCard key={comment.id}>
                                {commentEditId === comment.id ? (
                                    <CommentsCardTextEdiBox>
                                        <CommentsCardTextEditArea
                                            value={editedContent}
                                            onChange={(e) =>
                                                setEditedContent(e.target.value)
                                            }
                                        />
                                        <button
                                            onClick={() =>
                                                handleSaveComment(comment.id)
                                            }
                                        >
                                            Save
                                        </button>
                                        <button onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    </CommentsCardTextEdiBox>
                                ) : (
                                    <CommentCardContent>
                                        <CommentCardAvatar>
                                            <Avatar>
                                                <Image
                                                    priority
                                                    src={
                                                        findUserById(
                                                            comment?.owner_id,
                                                        )?.avatar_image
                                                    }
                                                    height={50}
                                                    width={50}
                                                    alt="Avatar icon"
                                                />
                                            </Avatar>
                                            <span>
                                                {
                                                    findUserById(
                                                        comment?.owner_id,
                                                    )?.username
                                                }
                                            </span>
                                        </CommentCardAvatar>
                                        <CommentCardContentText>
                                            <p>{comment.content}</p>{" "}
                                        </CommentCardContentText>
                                        <CommentCardContentButtons>
                                            <button
                                                onClick={() =>
                                                    handleLikeCommentClick(
                                                        index,
                                                    )
                                                }
                                            >
                                                Like ({comment.likes_number})
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDislike(index)
                                                }
                                            >
                                                Dislike (
                                                {comment.dislikes_number})
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleEditComment(
                                                        comment.id,
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setCommentReplyId(
                                                        comment.id,
                                                    )
                                                }
                                            >
                                                Reply
                                            </button>
                                        </CommentCardContentButtons>
                                        {console.log(
                                            findSubcommentsForThisComment(
                                                comment?.id,
                                            ),
                                        )}
                                    </CommentCardContent>
                                )}
                                {commentReplyId === comment.id && (
                                    <CommentReplyBox>
                                        <CommentsCardTextArea
                                            value={commentReplyContent}
                                            onChange={(e) =>
                                                setCommentReplyContent(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <button
                                            onClick={() =>
                                                handleAddReply(comment.id)
                                            }
                                        >
                                            Add reply
                                        </button>
                                        <button onClick={handleCancelReply}>
                                            Cancel reply
                                        </button>
                                    </CommentReplyBox>
                                )}
                            </CommentCard>
                        ))}
                </CommentsCardBox>
            )}
        </CommentsCardBox>
    );
};
export default CommentsCard;
