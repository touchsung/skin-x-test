export class PostDTO {
  id: number;
  title: string;
  content?: string;
  postedAt: Date;
  postedBy: { name: string };
  TagsOnPosts: {
    tag: { name: string };
  }[];
}
