import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePost, UpdatePost } from './dtos/posts.dto';
import { PostsRepository } from './posts.repository';
import { PublicationRepository } from '../publication/publication.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly publicationRepository: PublicationRepository,
  ) {}
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
  async updatePost(id: number, body: UpdatePost) {
    const post = await this.postsRepository.getPostById(id);
    if (!post) throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    return this.postsRepository.updatePost(id, body);
  }
  async deletePost(id: number) {
    const findPost = await this.postsRepository.getPostById(id);
    if (!findPost)
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    const cantDelete =
      await this.publicationRepository.getPublicationWithPostId(id);
    if (cantDelete)
      throw new HttpException('cant delete this post', HttpStatus.CONFLICT);
    return this.postsRepository.deletePost(id);
  }
}
