import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePost, UpdatePost } from './dtos/posts.dto';
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
  async updatePost(id: number, body: UpdatePost) {
    const post = await this.postsRepository.getPostById(id);
    if (!post) throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    console.log(body);
    return this.postsRepository.updatePost(id, body);
  }
  async deletePost(id: number) {
    const findPost = await this.postsRepository.getPostById(id);
    if (!findPost)
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    //TODO: VERIFICAR SE O POST NÃO TA LIGADO A NENHUMA PUBLICAÇÃO
    return this.postsRepository.deletePost(id);
  }
}
