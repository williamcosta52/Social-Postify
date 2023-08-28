import { Global } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { faker } from '@faker-js/faker';

@Global()
export class MediasFactories {
  constructor(private readonly prisma: PrismaService) {}

  createMedia() {
    return this.prisma.medias.create({
      data: {
        title: faker.word.words(),
        username: faker.word.words(),
      },
    });
  }
}
