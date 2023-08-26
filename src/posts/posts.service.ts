import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  async getPostById(id: number) {
    const post = await this.postsRepository.getPostById(id);
    if (!post) throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    return post;
  }
}
