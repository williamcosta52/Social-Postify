import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePublication {
  @IsNotEmpty()
  @IsNumber()
  mediaId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;
}
export class UpdatePublication extends CreatePublication {}
