import { Module } from '@nestjs/common';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { mediasRepository } from './medias.repository';

@Module({
  controllers: [MediasController],
  providers: [MediasService, mediasRepository],
})
export class MediasModule {}
