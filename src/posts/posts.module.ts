import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { PublicationRepository } from '../publication/publication.repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsRepository],
  imports: [PublicationRepository],
})
export class PostsModule {}
