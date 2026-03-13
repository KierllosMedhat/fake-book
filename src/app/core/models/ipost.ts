export interface Ipost {
    _id: string;
    body: string;
    image: string;
    privacy: string;
    user: User;
    sharedPost: null;
    createdAt: Date;
    commentsCount: number;
    topComment: null;
    sharesCount: number;
    likesCount: number;
    isShared: boolean;
    id: string;
    bookmarked: boolean;
}

export interface User {
    _id: string;
    name: string;
    username: string;
    photo: string;
}