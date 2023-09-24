import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Media, MediaUpdate } from './dtos/medias.dto';
import { MediasRepository } from './medias.repository';
import { PublicationRepository } from '../publication/publication.repository';

@Injectable()
export class MediasService {
  constructor(
    private readonly mediasRepository: MediasRepository,
    private readonly publicationRepository: PublicationRepository,
  ) {}
  getAllMedias() {
    return this.mediasRepository.getAllMedias();
  }
  async createMedia(body: Media) {
    const verifyDuplicateMedia =
      await this.mediasRepository.verifyDuplicateMedia(body);
    if (verifyDuplicateMedia) {
      throw new HttpException('conflict', HttpStatus.CONFLICT);
    }
    return this.mediasRepository.createMedia(body);
  }
  async getMediaById(id: number) {
    const media = await this.mediasRepository.getMediaById(id);
    if (!media) {
      throw new HttpException('media not found!', HttpStatus.NOT_FOUND);
    }
    return media;
  }
  async updateMedia(id: number, body: MediaUpdate) {
    const verifyMediaById = await this.mediasRepository.getMediaById(id);
    if (!verifyMediaById) {
      throw new HttpException('media not found', HttpStatus.NOT_FOUND);
    }
    const verifyUsernameAndTitle =
      await this.mediasRepository.verifyDuplicateMedia(body);
    if (verifyUsernameAndTitle) {
      throw new HttpException(
        'cannot update a media with a same title or username existent',
        HttpStatus.CONFLICT,
      );
    }
    return this.mediasRepository.updateMedia(id, body);
  }
  async deleteMedia(id: number) {
    const verifyMediaById = await this.mediasRepository.getMediaById(id);
    if (!verifyMediaById) {
      throw new HttpException('media not found', HttpStatus.NOT_FOUND);
    }
    const cantDelete =
      await this.publicationRepository.getPublicationByMediaId(id);
    if (cantDelete)
      throw new HttpException('cant delete this media', HttpStatus.CONFLICT);
    return this.mediasRepository.deleteMedia(id);
  }
}
