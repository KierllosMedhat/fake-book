export interface Icomment {
    _id: string;
    content: string;
    image: string;
    commentCreator: CommentCreator;
    postId: string;
    parentComment: null;
    likes: any[];
    createdAt: Date;
    repliesCount: number;
}

export interface CommentCreator {
    _id: string;
    name: string;
    username: string;
    photo: string;
}