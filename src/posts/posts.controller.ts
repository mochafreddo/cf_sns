import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { PostModel } from './posts.service';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostModel[] {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    return this.postsService.getPostById(+id);
  }

  @Post()
  postPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): PostModel {
    return this.postsService.createPost(author, title, content);
  }

  @Put(':id')
  putPosts(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ): PostModel {
    return this.postsService.updatePost(+id, author, title, content);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): number {
    return this.postsService.deletePost(+id);
  }
}
