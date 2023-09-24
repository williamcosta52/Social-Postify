import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { PublicationRepository } from './publication.repository';
import { PostsRepository } from '../posts/posts.repository';
import { MediasRepository } from '../medias/medias.repository';
import { MediasModule } from '../medias/medias.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository],
  imports: [PostsRepository, MediasRepository, MediasModule, PostsModule],
  exports: [PublicationRepository],
})
export class PublicationModule {}
