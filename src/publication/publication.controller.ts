import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublication, UpdatePublication } from './dtos/publication.dto';

@Controller()
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}
  @Post('publications')
  createPublication(@Body() body: CreatePublication) {
    return this.publicationService.createPublication(body);
  }
  @Get('publications')
  getPublications(
    @Query('published') published?: string,
    @Query('after') after?: string,
  ) {
    const boolean = published === 'true' ? true : false;
    const date = new Date(after);
    return this.publicationService.getPublications(boolean, date);
  }
  @Get('publications/:id')
  getPublicationsById(@Param('id', ParseIntPipe) id: number) {
    return this.publicationService.getPublicationById(id);
  }
  @Put('publications/:id')
  updatePublication(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePublication,
  ) {
    return this.publicationService.updatePublication(id, body);
  }
  @Delete('publications/:id')
  deletePublication(@Param('id', ParseIntPipe) id: number) {
    return this.publicationService.deletePublication(id);
  }
}
