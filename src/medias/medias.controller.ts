import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MediasService } from './medias.service';
import { Media, MediaUpdate } from './dtos/medias.dto';

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
  @Put('medias/:id')
  updateMedia(@Param('id') id: string, @Body() body: MediaUpdate) {
    return this.mediasService.updateMedia(Number(id), body);
  }
  @Delete('medias/:id')
  deleteMedia(@Param('id') id: string) {
    return this.mediasService.deleteMedia(Number(id));
  }
}
