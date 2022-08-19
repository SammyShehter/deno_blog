export interface BlogSettings {
    title?: string;
    description?: string;
    avatar?: string;
    avatarClass?: string;
    cover?: string;
    coverTextColor?: string;
    author?: string;
    links?: {
      title: string;
      url: string;
      target?: "_self" | "_blank" | "_parent" | "_top";
    }[];
    showHeaderOnPostPage?: boolean;
    style?: string;
    ogImage?: string;
    lang?: string;
    canonicalUrl?: string;
    theme?: "dark" | "light" | "auto";
    favicon?: string;
    port?: number;
    hostname?: string;
  }

export interface Post {
    pathname?: string
    markdown: string
    title?: string
    publishDate: Date
    author?: string
    snippet?: string
    coverHtml?: string
    /** An image URL which is used in the OpenGraph og:image tag. */
    ogImage?: string
    tags?: string[]
}

export interface IndexProps {
    posts: Array<Post>;
    postsAmount:number;
    currentPage: number;
  }
  

export interface PaginationProps {
    currentPage: number
    pagesAmount: number
}

export interface DirectionProps {
    way: string
    page: number
    limit: number
}

export interface PaginationPageProps {
    pageNumber: number
    disable: boolean
}

export interface DirectionProps {
  way: string;
  page: number;
  limit: number;
}

export interface IndexProps {
  posts: Array<Post>;
  postsAmount:number;
  currentPage: number;
}

export interface PaginationProps {
  currentPage: number;
   pagesAmount:number;
}

export interface DirectionProps {
  way: string;
  page: number;
  limit: number;
}

export interface PaginationPageProps {
  pageNumber: number
  disable: boolean
}