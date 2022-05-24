export interface PostType {
    title: string;
    url: string;
    created_at: string;
    author: string;
    objectID: number;
}

export interface ContextType {
    posts: PostType[];
    handlePageChange: (_event:React.ChangeEvent<unknown>, value: number) => void;
    page: number;
    currentPage: number;
    rowsPerPage: number;
    handleError: boolean
}

export interface DataProps {
    data: ContextType;
}