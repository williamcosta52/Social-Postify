import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
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
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }
  @Put('posts/:id')
  updatePost(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePost) {
    return this.postsService.updatePost(id, body);
  }
  @Delete('posts/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
