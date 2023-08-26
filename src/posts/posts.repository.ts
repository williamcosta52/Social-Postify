import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePost } from './dtos/posts.dto';

@Injectable()
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
}
