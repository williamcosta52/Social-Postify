import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Media, MediaUpdate } from './dtos/medias.dto';

@Injectable()
export class mediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async verifyDuplicateMedia(body: Media | MediaUpdate) {
    return this.prisma.medias.findFirst({
      where: {
        AND: [{ title: body.title }, { username: body.username }],
      },
    });
  }
  async createMedia(body: Media) {
    return this.prisma.medias.create({
      data: {
        title: body.title,
        username: body.username,
      },
    });
  }
  async getAllMedias() {
    return this.prisma.medias.findMany();
  }
  async getMediaById(id: number) {
    return this.prisma.medias.findFirst({
      where: { id },
    });
  }
  async updateMedia(id: number, body: MediaUpdate) {
    return this.prisma.medias.update({
      data: {
        title: body.title,
        username: body.username,
      },
      where: { id },
    });
  }
  async deleteMedia(id: number) {
    return this.prisma.medias.delete({
      where: { id },
    });
  }
}
