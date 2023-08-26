import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  @Get('medias/:id')
  getMediaById(@Param('id') id: string) {
    return this.mediasService.getMediaById(Number(id));
  }
}
