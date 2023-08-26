import { Injectable } from '@nestjs/common';
import { CreatePost } from './dtos/posts.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  createPost(body: CreatePost) {
    return this.postsRepository.createPost(body);
  }
  getAllPosts() {
    return this.postsRepository.getAllPosts();
  }
}
