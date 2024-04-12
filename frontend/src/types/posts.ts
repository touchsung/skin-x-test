export interface Post {
  id: number;
  title: string;
  content?: string;
  postedAt: string;
  postedBy: { name: string };
  TagsOnPosts: {
    tag: {
      name: string;
    };
  }[];
}

export interface queryGetAllPosts {
  skip?: string;
  take?: string;
  tag?: string;
  title?: string;
  orderByParam?: string;
  sortBy?: string;
  lastCursor?: number;
}
