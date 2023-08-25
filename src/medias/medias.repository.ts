import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Media } from './dtos/medias.dto';

@Injectable()
export class mediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMedia(body: Media) {
    return this.prisma.medias.create({
      data: {
        title: body.title,
        username: body.username,
      },
    });
  }
}
