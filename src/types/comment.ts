export interface Comment {
    id: string;
    content: string;
    likes_number: number;
    dislikes_number: number;
    owner_id: string;
    bill_id: string;
}

export interface CommentFormData {
    content: string;
    owner_id: string;
    bill_id: string;
}

export interface UpdateCommentFormData {
    content: string;
    likes_number: number;
    dislikes_number: number;
}

export interface Subcomment {
    id: string;
    content: string;
    likes_number: number;
    dislikes_number: number;
    comment_id: string;
    owner_id: string;
    bill_id: string;
}

export interface SubcommentFormData {
    content: string;
    comment_id: string;
    owner_id: string;
    bill_id: string;
}

export interface UpdateSubcommentFormData {
    content: string;
    likes_number: number;
    dislikes_number: number;
}
