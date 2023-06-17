import React, { ReactElement, useState } from "react";
import {
    Comment,
    CommentFormData,
    Subcomment,
    SubcommentFormData,
} from "../../types/comment";
import {
    createComment,
    createSubcomment,
    deleteComment,
    deleteSubcomment,
    selectCommentState,
    updateComment,
    updateSubcomment,
} from "@redux/slices/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    CommentCard,
    CommentCardAvatar,
    CommentCardContent,
    CommentCardContentButtons,
    CommentCardContentText,
    CommentCardRepliesBox,
    CommentReplyBox,
    CommentsCardBox,
    CommentsCardTextArea,
    CommentsCardTextEdiBox,
    CommentsCardTextEditArea,
    CreateCommentButton,
} from "@components/comments-card/comments-card.styles";
import Spinner from "@components/spinner";
import { selectUserState } from "@redux/slices/userSlice";
import { User } from "../../types/user";
import { AvatarList } from "@styles/pages/admin/admin.styles";
import Image from "next/image";
import { selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../../types/jwt";
import { getDecodedJWTToken } from "../../utils/jwt";
import { useTranslation } from "react-i18next";

export type TCommentsCardProps = {
    billId: string;
};

const CommentsCard = ({ billId }: TCommentsCardProps): ReactElement => {
    const {
        isLoading,
        billComments,
        isCreateCommentLoading,
        isUpdateLoading,
        isDeleteCommentLoading,
        isDeleteSubcommentLoading,
    } = useSelector(selectCommentState);
    const { isLoading: usersLoading, users } = useSelector(selectUserState);
    const { t } = useTranslation();
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
    const [key, setKey] = useState(0);
    const addCommentClick = () => {
        if (newCommentContent.trim() !== "") {
            const newCommentData: CommentFormData = {
                content: newCommentContent,
                owner_id: userId,
                bill_id: billId,
            };
            dispatch(createComment(newCommentData));
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
            setCommentReplyContent("");
        }
    };

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

    const handleDeleteComment = (id: string) => {
        dispatch(deleteComment(id));
        setKey((prev) => prev + 1);
    };

    const handleDeleteSubcomment = (id: string) => {
        dispatch(deleteSubcomment(id));
    };

    return (
        <CommentsCardBox key={key}>
            {isCreateCommentLoading &&
            isUpdateLoading &&
            isDeleteCommentLoading &&
            isDeleteSubcommentLoading &&
            usersLoading ? (
                <Spinner isSmall />
            ) : (
                <CommentsCardBox>
                    <h2>{t("components.commentsCard.title")}</h2>
                    <CommentsCardTextArea
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                    />
                    <CreateCommentButton onClick={addCommentClick}>
                        {isLoading
                            ? t(
                                  "components.commentsCard.addCommentButton.textLoading",
                              )
                            : t(
                                  "components.commentsCard.addCommentButton.text",
                              )}
                    </CreateCommentButton>
                    {!isLoading &&
                        !usersLoading &&
                        !isDeleteCommentLoading &&
                        !isDeleteSubcommentLoading &&
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
                                            {t(
                                                "components.commentsCard.buttons.save",
                                            )}
                                        </button>
                                        <button onClick={handleCancelEdit}>
                                            {t(
                                                "components.commentsCard.buttons.cancel",
                                            )}
                                        </button>
                                    </CommentsCardTextEdiBox>
                                ) : (
                                    <CommentCardContent>
                                        <CommentCardAvatar>
                                            <AvatarList>
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
                                            </AvatarList>
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
                                        <CommentCardContentButtons isComment>
                                            <button
                                                onClick={() =>
                                                    handleLikeCommentClick(
                                                        comment?.id,
                                                    )
                                                }
                                            >
                                                {t(
                                                    "components.commentsCard.buttons.like",
                                                )}{" "}
                                                ({comment.likes_number})
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDislikeCommentClick(
                                                        comment?.id,
                                                    )
                                                }
                                            >
                                                {t(
                                                    "components.commentsCard.buttons.dislike",
                                                )}{" "}
                                                ({comment.dislikes_number})
                                            </button>
                                            {comment &&
                                                comment?.owner_id ===
                                                    userId && (
                                                    <button
                                                        onClick={() =>
                                                            handleEditComment(
                                                                comment.id,
                                                            )
                                                        }
                                                    >
                                                        {t(
                                                            "components.commentsCard.buttons.edit",
                                                        )}
                                                    </button>
                                                )}
                                            <button
                                                onClick={() =>
                                                    setCommentReplyId(
                                                        comment.id,
                                                    )
                                                }
                                            >
                                                {t(
                                                    "components.commentsCard.buttons.reply",
                                                )}
                                            </button>
                                            {comment &&
                                                comment?.owner_id ===
                                                    userId && (
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteComment(
                                                                comment?.id,
                                                            )
                                                        }
                                                    >
                                                        <Image
                                                            src="/icons/delete_icon_white.svg"
                                                            width={30}
                                                            height={30}
                                                            alt="Delete-icon.svg"
                                                        />
                                                    </button>
                                                )}
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
                                            {t(
                                                "components.commentsCard.buttons.addReply",
                                            )}
                                        </button>
                                        <button onClick={handleCancelReply}>
                                            {t(
                                                "components.commentsCard.buttons.cancelReply",
                                            )}
                                        </button>
                                    </CommentReplyBox>
                                )}
                                <CommentCardRepliesBox>
                                    {allComments &&
                                        findSubcommentsForThisComment(
                                            comment?.id,
                                        )?.map((subcomment: Subcomment) => (
                                            <div key={subcomment.id}>
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
                                                                {t(
                                                                    "components.commentsCard.buttons.save",
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={
                                                                    handleCancelSubcommentEdit
                                                                }
                                                            >
                                                                {t(
                                                                    "components.commentsCard.buttons.cancel",
                                                                )}
                                                            </button>
                                                        </CommentsCardTextEdiBox>
                                                    ) : (
                                                        <CommentCardContent>
                                                            <CommentCardAvatar>
                                                                <AvatarList>
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
                                                                </AvatarList>
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
                                                                    {t(
                                                                        "components.commentsCard.buttons.like",
                                                                    )}{" "}
                                                                    (
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
                                                                    {t(
                                                                        "components.commentsCard.buttons.dislike",
                                                                    )}{" "}
                                                                    (
                                                                    {
                                                                        subcomment?.dislikes_number
                                                                    }
                                                                    )
                                                                </button>
                                                                {subcomment &&
                                                                    subcomment?.owner_id ===
                                                                        userId && (
                                                                        <button
                                                                            onClick={() =>
                                                                                handleEditSubcomment(
                                                                                    subcomment?.id,
                                                                                )
                                                                            }
                                                                        >
                                                                            {t(
                                                                                "components.commentsCard.buttons.edit",
                                                                            )}
                                                                        </button>
                                                                    )}
                                                                {subcomment &&
                                                                    subcomment?.owner_id ===
                                                                        userId && (
                                                                        <button
                                                                            onClick={() =>
                                                                                handleDeleteSubcomment(
                                                                                    subcomment?.id,
                                                                                )
                                                                            }
                                                                        >
                                                                            <Image
                                                                                src="/icons/delete_icon_white.svg"
                                                                                width={
                                                                                    30
                                                                                }
                                                                                height={
                                                                                    30
                                                                                }
                                                                                alt="Delete-icon.svg"
                                                                            />
                                                                        </button>
                                                                    )}
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
                                        {allComments &&
                                        !(
                                            findSubcommentsForThisComment(
                                                comment?.id,
                                            )?.length > 0
                                        )
                                            ? t(
                                                  "components.commentsCard.noRepliesText",
                                              )
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
