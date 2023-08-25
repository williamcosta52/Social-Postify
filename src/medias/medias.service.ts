import { Injectable } from '@nestjs/common';
import { Media } from './dtos/medias.dto';
import { mediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: mediasRepository) {}
  createMedia(body: Media) {
    return this.mediasRepository.createMedia(body);
  }
}
