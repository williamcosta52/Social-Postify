import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublication, UpdatePublication } from './dtos/publication.dto';

@Injectable()
export class PublicationRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createPublication(body: CreatePublication) {
    return await this.prisma.publication.create({
      data: {
        mediaId: body.mediaId,
        postId: body.postId,
        date: body.date,
      },
    });
  }
  async getPublications(published?: boolean, date?: Date) {
    let publications = await this.prisma.publication.findMany();
    if (published !== undefined) {
      const currentDate = new Date();
      publications = publications.filter((pub) =>
        published ? pub.date < currentDate : pub.date > currentDate,
      );
    }
    if (date) {
      publications = publications.filter((pub) => pub.date < date);
    }
    return publications;
  }
  async getPublicationById(id: number) {
    return this.prisma.publication.findFirst({
      where: { id },
    });
  }
  async updatePublication(id: number, body: UpdatePublication) {
    return await this.prisma.publication.update({
      data: {
        mediaId: body.mediaId,
        postId: body.postId,
        date: body.date,
      },
      where: { id },
    });
  }
  async deletePublication(id: number) {
    return await this.prisma.publication.delete({
      where: { id },
    });
  }
  async getPublicationWithPostId(id: number) {
    return await this.prisma.publication.findFirst({
      where: { postId: id },
    });
  }
  async getPublicationByMediaId(id: number) {
    return await this.prisma.publication.findFirst({
      where: { mediaId: id },
    });
  }
}
