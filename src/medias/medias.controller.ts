import { Body, Controller, Get, Post } from '@nestjs/common';
import { MediasService } from './medias.service';
import { Media } from './dtos/medias.dto';

@Controller()
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post('medias')
  createMedia(@Body() body: Media) {
    return this.mediasService.createMedia(body);
  }
  @Get('medias')
  getAllMedias() {
    return this.mediasService.getAllMedias();
  }
}
