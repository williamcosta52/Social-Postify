import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Media, MediaUpdate } from './dtos/medias.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository) {}
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
    //TODO: VERIFICAR SE A MEDIA TA LIGADA A ALGUMA PUBLICAÇÃO
    return this.mediasRepository.deleteMedia(id);
  }
}
