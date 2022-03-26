export interface PostFrontMatter {
    title: string;
    date: string;
    tags?: string[]
    description?: string;
    ignore_in_list?: boolean;
    path?: string
}