import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { CreatePublication, UpdatePublication } from './dtos/publication.dto';
import { MediasRepository } from '../medias/medias.repository';
import { PostsRepository } from '../posts/posts.repository';

@Injectable()
export class PublicationService {
  constructor(
    private readonly mediasRepository: MediasRepository,
    private readonly postsRepository: PostsRepository,
    private readonly publicationRepository: PublicationRepository,
  ) {}

  async createPublication(body: CreatePublication) {
    const media = await this.mediasRepository.getMediaById(body.mediaId);
    const post = await this.postsRepository.getPostById(body.postId);
    if (!media || !post)
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return this.publicationRepository.createPublication(body);
  }
  getPublications(published?: boolean, date?: Date) {
    return this.publicationRepository.getPublications(published, date);
  }
  getPublicationById(id: number) {
    return this.publicationRepository.getPublicationById(id);
  }
  async updatePublication(id: number, body: UpdatePublication) {
    const publi = await this.publicationRepository.getPublicationById(id);
    const media = await this.mediasRepository.getMediaById(body.mediaId);
    const post = await this.postsRepository.getPostById(body.postId);
    if (publi.date < new Date()) {
      throw new HttpException(
        'cannot update a posted publication',
        HttpStatus.FORBIDDEN,
      );
    }
    if (!publi || !media || !post) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    return this.publicationRepository.updatePublication(id, body);
  }
  deletePublication(id: number) {
    return this.publicationRepository.deletePublication(id);
  }
}
