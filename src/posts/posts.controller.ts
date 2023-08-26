import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePost } from './dtos/posts.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('posts')
  createPost(@Body() body: CreatePost) {
    return this.postsService.createPost(body);
  }
}
