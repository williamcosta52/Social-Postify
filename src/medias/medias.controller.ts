import { Body, Controller, Post } from '@nestjs/common';
import { MediasService } from './medias.service';
import { Media } from './dtos/medias.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post('medias')
  createMedia(@Body() body: Media) {
    return this.mediasService.createMedia(body);
  }
}
