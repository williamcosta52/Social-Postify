import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePost, UpdatePost } from './dtos/posts.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('posts')
  createPost(@Body() body: CreatePost) {
    return this.postsService.createPost(body);
  }
  @Get('posts')
  getAllPosts() {
    return this.postsService.getAllPosts();
  }
  @Get('posts/:id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }
  @Put('posts/:id')
  updatePost(@Param('id') id: string, body: UpdatePost) {}
}
