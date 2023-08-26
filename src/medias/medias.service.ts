import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Media } from './dtos/medias.dto';
import { mediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: mediasRepository) {}
  async createMedia(body: Media) {
    const verifyDuplicateMedia =
      await this.mediasRepository.verifyDuplicateMedia(body);
    if (verifyDuplicateMedia) {
      throw new HttpException('conflict', HttpStatus.CONFLICT);
    }
    return this.mediasRepository.createMedia(body);
  }
  getAllMedias() {
    return this.mediasRepository.getAllMedias();
  }
  async getMediaById(id: number) {
    const media = await this.mediasRepository.getMediaById(id);
    if (!media) {
      throw new HttpException('media not found!', HttpStatus.NOT_FOUND);
    }
    return media;
  }
}
