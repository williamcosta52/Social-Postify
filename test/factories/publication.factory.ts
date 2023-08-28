import { Global } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { PostsFactory } from './posts.factory';
import { MediasFactories } from './medias.factory';

@Global()
export class PublicationFactory {
  constructor(private readonly prisma: PrismaService) {}

  async createPublication(mediaId: number, postId: number, date: Date) {
    return await this.prisma.publication.create({
      data: {
        mediaId,
        postId,
        date,
      },
    });
  }
}
