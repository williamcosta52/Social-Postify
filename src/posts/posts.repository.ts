import { Global } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePost, UpdatePost } from './dtos/posts.dto';

@Global()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createPost(body: CreatePost) {
    return await this.prisma.posts.create({
      data: {
        text: body.text,
        title: body.title,
        image: body.image,
      },
    });
  }
  async getAllPosts() {
    return await this.prisma.posts.findMany();
  }
  async getPostById(id: number) {
    return await this.prisma.posts.findFirst({
      where: { id },
    });
  }
  async updatePost(id: number, body: UpdatePost) {
    return await this.prisma.posts.update({
      data: {
        text: body.text,
        title: body.title,
        image: body.image,
      },
      where: { id },
    });
  }
  async deletePost(id: number) {
    return await this.prisma.posts.delete({
      where: { id },
    });
  }
}
