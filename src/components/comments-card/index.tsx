import React, { ReactElement, useEffect, useState } from "react";
import {
    Comment,
    CommentFormData,
    Subcomment,
    SubcommentFormData,
} from "../../types/comment";
import {
    createComment,
    createSubcomment,
    fetchBillComments,
    selectCommentState,
    updateComment,
    updateSubcomment,
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
    CommentCardRepliesBox,
} from "@components/comments-card/comments-card.styles";
import Spinner from "@components/spinner";
import { selectUserState } from "@redux/slices/userSlice";
import { User } from "../../types/user";
import { Avatar } from "@styles/pages/admin/admin.styles";
import Image from "next/image";
import { selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../../types/jwt";
import { getDecodedJWTToken } from "../../utils/jwt";

export type TCommentsCardProps = {
    billId: string;
};

const CommentsCard = ({ billId }: TCommentsCardProps): ReactElement => {
    const {
        isLoading,
        billComments,
        isCreateCommentLoading,
        createCommentSuccess,
        isUpdateLoading,
        createSubcommentSuccess,
        updateSubcommentSuccess,
    } = useSelector(selectCommentState);
    const { isLoading: usersLoading, users } = useSelector(selectUserState);
    const [allComments, setAllComments] = useState<Comment[]>(
        billComments && billComments?.commentsBill,
    );
    const [allSubcomments, setAllSubcomments] = useState<Subcomment[]>(
        billComments && billComments?.subcommentsBill,
    );
    const { isAuthenticated, token } = useSelector(selectAuthState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }

    const [newCommentContent, setNewCommentContent] = useState("");
    const [isUserVoted, setIsUserVoted] = useState<{
        [commentId: string]: boolean;
    }>({});
    const [isUserVotedSubComment, setIsUserVotedSubcomment] = useState<{
        [subcommentId: string]: boolean;
    }>({});
    const [commentEditId, setCommentEditId] = useState<string | null>(null);
    const [editedContent, setEditedContent] = useState("");
    const dispatch = useDispatch();
    const [commentReplyId, setCommentReplyId] = useState<string | null>(null);
    const [commentReplyContent, setCommentReplyContent] = useState("");
    const [editedSubcommentContent, setEditedSubcommentContent] = useState("");
    const [subcommentEditId, setSubcommentEditId] = useState<string | null>(
        null,
    );
    const addCommentClick = () => {
        if (newCommentContent.trim() !== "") {
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

    const addSuncommentClick = (commentId: string) => {
        if (commentReplyContent.trim() !== "") {
            const newSubcommentData: SubcommentFormData = {
                content: commentReplyContent,
                comment_id: commentId,
                owner_id: userId,
                bill_id: billId,
            };
            dispatch(createSubcomment(newSubcommentData));
            console.log(newSubcommentData);
            setCommentReplyContent("");
        }
    };

    console.log("billComments", billComments);
    console.log("comments", allComments);
    console.log("allSubcomments", allSubcomments);
    console.log("createSubcommentSuccess", createSubcommentSuccess);

    const handleLikeCommentClick = (commentId: string) => {
        let commentLikesNumber = 0;
        if (!isUserVoted[commentId]) {
            const updatedComments = allComments.map((comment: Comment) => {
                if (comment.id === commentId) {
                    commentLikesNumber = comment?.likes_number;
                    return {
                        ...comment,
                        likes_number: comment.likes_number + 1,
                    };
                }
                return comment;
            });
            setAllComments(updatedComments);
            setIsUserVoted({ ...isUserVoted, [commentId]: true });
            dispatch(
                updateComment(commentId, {
                    likes_number: commentLikesNumber + 1,
                }),
            );
        }
    };
    const handleDislikeCommentClick = (commentId: string) => {
        let commentDislikesNumber = 0;
        if (!isUserVoted[commentId]) {
            const updatedComments = allComments.map((comment: Comment) => {
                if (comment.id === commentId) {
                    commentDislikesNumber = comment?.dislikes_number;
                    return {
                        ...comment,
                        dislikes_number: comment.dislikes_number + 1,
                    };
                }
                return comment;
            });
            setAllComments(updatedComments);
            setIsUserVoted({ ...isUserVoted, [commentId]: true });
            dispatch(
                updateComment(commentId, {
                    dislikes_number: commentDislikesNumber + 1,
                }),
            );
        }
    };

    const handleLikeSubcommentClick = (subcommentId: string) => {
        let commentLikesNumber = 0;
        if (!isUserVotedSubComment[subcommentId]) {
            const updatedComments = allSubcomments.map(
                (subcomment: Subcomment) => {
                    if (subcomment.id === subcommentId) {
                        commentLikesNumber = subcomment?.likes_number;
                        return {
                            ...subcomment,
                            likes_number: subcomment.likes_number + 1,
                        };
                    }
                    return subcomment;
                },
            );
            setAllSubcomments(updatedComments);
            setIsUserVotedSubcomment({
                ...isUserVotedSubComment,
                [subcommentId]: true,
            });
            dispatch(
                updateSubcomment(subcommentId, {
                    likes_number: commentLikesNumber + 1,
                }),
            );
        }
    };
    const handleDislikeSubcommentClick = (subcommentId: string) => {
        let commentDislikesNumber = 0;
        if (!isUserVotedSubComment[subcommentId]) {
            const updatedComments = allSubcomments.map(
                (subcomment: Subcomment) => {
                    if (subcomment.id === subcommentId) {
                        commentDislikesNumber = subcomment?.dislikes_number;
                        return {
                            ...subcomment,
                            dislikes_number: subcomment.dislikes_number + 1,
                        };
                    }
                    return subcomment;
                },
            );
            setAllSubcomments(updatedComments);
            setIsUserVotedSubcomment({
                ...isUserVotedSubComment,
                [subcommentId]: true,
            });
            dispatch(
                updateSubcomment(subcommentId, {
                    dislikes_number: commentDislikesNumber + 1,
                }),
            );
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
        dispatch(
            updateComment(commentId, {
                content: editedContent,
            }),
        );
    };
    const handleCancelEdit = () => {
        setCommentEditId(null);
        setEditedContent("");
    };

    const handleEditSubcomment = (subcommentId: string) => {
        setSubcommentEditId(subcommentId);
        const subcomment = allSubcomments.find((c) => c.id === subcommentId);
        if (subcomment) {
            setEditedSubcommentContent(subcomment?.content);
        }
    };
    const handleSaveSubcomment = (subcommentId: string) => {
        const updatedComments = allSubcomments.map((subcomment) => {
            console.log("herererererer", editedSubcommentContent);
            if (subcomment.id === subcommentId) {
                return { ...subcomment, content: editedSubcommentContent };
            }
            return subcomment;
        });
        setAllSubcomments(updatedComments);
        setSubcommentEditId(null);
        dispatch(
            updateSubcomment(subcommentId, {
                content: editedSubcommentContent,
            }),
        );
    };
    const handleCancelSubcommentEdit = () => {
        setSubcommentEditId(null);
        setEditedSubcommentContent("");
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
            {isCreateCommentLoading && isUpdateLoading && usersLoading ? (
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
                        allComments?.map((comment: Comment) => (
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
                                                        comment?.id,
                                                    )
                                                }
                                            >
                                                Like ({comment.likes_number})
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDislikeCommentClick(
                                                        comment?.id,
                                                    )
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
                                                addSuncommentClick(comment.id)
                                            }
                                        >
                                            Add reply
                                        </button>
                                        <button onClick={handleCancelReply}>
                                            Cancel reply
                                        </button>
                                    </CommentReplyBox>
                                )}
                                <CommentCardRepliesBox>
                                    {allComments &&
                                        findSubcommentsForThisComment(
                                            comment?.id,
                                        )?.map((subcomment: Subcomment) => (
                                            <div>
                                                <CommentCard
                                                    key={subcomment.id}
                                                >
                                                    {subcommentEditId ===
                                                    subcomment.id ? (
                                                        <CommentsCardTextEdiBox>
                                                            <CommentsCardTextEditArea
                                                                value={
                                                                    editedSubcommentContent
                                                                }
                                                                onChange={(e) =>
                                                                    setEditedSubcommentContent(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                            <button
                                                                onClick={() =>
                                                                    handleSaveSubcomment(
                                                                        subcomment?.id,
                                                                    )
                                                                }
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={
                                                                    handleCancelSubcommentEdit
                                                                }
                                                            >
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
                                                                                subcomment?.owner_id,
                                                                            )
                                                                                ?.avatar_image
                                                                        }
                                                                        height={
                                                                            50
                                                                        }
                                                                        width={
                                                                            50
                                                                        }
                                                                        alt="Avatar icon"
                                                                    />
                                                                </Avatar>
                                                                <span>
                                                                    {
                                                                        findUserById(
                                                                            subcomment?.owner_id,
                                                                        )
                                                                            ?.username
                                                                    }
                                                                </span>
                                                            </CommentCardAvatar>
                                                            <CommentCardContentText>
                                                                <p>
                                                                    {
                                                                        subcomment?.content
                                                                    }
                                                                </p>{" "}
                                                            </CommentCardContentText>
                                                            <CommentCardContentButtons>
                                                                <button
                                                                    onClick={() =>
                                                                        handleLikeSubcommentClick(
                                                                            subcomment?.id,
                                                                        )
                                                                    }
                                                                >
                                                                    Like (
                                                                    {
                                                                        subcomment?.likes_number
                                                                    }
                                                                    )
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDislikeSubcommentClick(
                                                                            subcomment?.id,
                                                                        )
                                                                    }
                                                                >
                                                                    Dislike (
                                                                    {
                                                                        subcomment?.dislikes_number
                                                                    }
                                                                    )
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleEditSubcomment(
                                                                            subcomment?.id,
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                            </CommentCardContentButtons>
                                                        </CommentCardContent>
                                                    )}
                                                </CommentCard>
                                            </div>
                                        ))}
                                    <p
                                        style={{
                                            color: "grey",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {" "}
                                        {allComments &&
                                        !(
                                            findSubcommentsForThisComment(
                                                comment?.id,
                                            )?.length > 0
                                        )
                                            ? "No replies"
                                            : null}
                                    </p>
                                </CommentCardRepliesBox>
                            </CommentCard>
                        ))}
                </CommentsCardBox>
            )}
        </CommentsCardBox>
    );
};
export default CommentsCard;
