import { Injectable, NotFoundException } from '@nestjs/common';

export type PostModel = {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
};

let posts: PostModel[] = [
  { id: 1, author: '', title: '', content: '', likeCount: 0, commentCount: 0 },
  { id: 2, author: '', title: '', content: '', likeCount: 0, commentCount: 0 },
  { id: 3, author: '', title: '', content: '', likeCount: 0, commentCount: 0 },
];

@Injectable()
export class PostsService {
  getAllPosts(): PostModel[] {
    return posts;
  }

  getPostById(id: number): PostModel {
    const post = posts.find((post) => post.id === +id);

    if (!post) throw new NotFoundException();

    return post;
  }

  createPost(author: string, title: string, content: string): PostModel {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  updatePost(
    postId: number,
    author?: string,
    title?: string,
    content?: string,
  ): PostModel {
    const post = posts.find((post) => post.id === postId);

    if (!post) throw new NotFoundException();

    if (author) post.author = author;
    if (title) post.title = title;
    if (content) post.content = content;

    posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));

    return post;
  }

  deletePost(postId: number): number {
    const post = posts.find((post) => post.id === postId);
    if (!post) throw new NotFoundException();

    posts = posts.filter((post) => post.id !== postId);
    return postId;
  }
}
