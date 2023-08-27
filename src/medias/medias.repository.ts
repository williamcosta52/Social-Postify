import { Global, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Media, MediaUpdate } from './dtos/medias.dto';

@Global()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async verifyDuplicateMedia(body: Media | MediaUpdate) {
    return await this.prisma.medias.findFirst({
      where: {
        AND: [{ title: body.title }, { username: body.username }],
      },
    });
  }
  async createMedia(body: Media) {
    return await this.prisma.medias.create({
      data: {
        title: body.title,
        username: body.username,
      },
    });
  }
  async getAllMedias() {
    return await this.prisma.medias.findMany();
  }
  async getMediaById(id: number) {
    return await this.prisma.medias.findFirst({
      where: { id },
    });
  }
  async updateMedia(id: number, body: MediaUpdate) {
    return await this.prisma.medias.update({
      data: {
        title: body.title,
        username: body.username,
      },
      where: { id },
    });
  }
  async deleteMedia(id: number) {
    return await this.prisma.medias.delete({
      where: { id },
    });
  }
}
