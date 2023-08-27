import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  getMediaById(@Param('id', ParseIntPipe) id: number) {
    return this.mediasService.getMediaById(id);
  }
  @Put('medias/:id')
  updateMedia(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: MediaUpdate,
  ) {
    return this.mediasService.updateMedia(id, body);
  }
  @Delete('medias/:id')
  deleteMedia(@Param('id', ParseIntPipe) id: number) {
    return this.mediasService.deleteMedia(id);
  }
}
