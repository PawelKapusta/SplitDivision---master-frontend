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

export interface Subcomment {
    id: string;
    content: string;
    likes_number: number;
    dislikes_number: number;
    comment_id: string;
    owner_id: string;
    bill_id: string;
}
