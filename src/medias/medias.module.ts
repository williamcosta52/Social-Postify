import { Module } from '@nestjs/common';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { MediasRepository } from './medias.repository';
import { PublicationRepository } from '../publication/publication.repository';

@Module({
  controllers: [MediasController],
  providers: [MediasService, MediasRepository],
  exports: [MediasRepository],
  imports: [PublicationRepository],
})
export class MediasModule {}
