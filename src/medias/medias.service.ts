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
}
