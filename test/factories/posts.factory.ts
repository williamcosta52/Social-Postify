import { Global } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { faker } from '@faker-js/faker';

@Global()
export class PostsFactory {
  constructor(private readonly prisma: PrismaService) {}
  createPost() {
    return this.prisma.posts.create({
      data: {
        text: faker.word.words(),
        title: faker.word.words(),
      },
    });
  }
}
