import { IsNotEmpty, IsString } from 'class-validator';

export class Media {
  @IsString()
  @IsNotEmpty({
    message: 'All fields are required',
  })
  title: string;

  @IsString()
  @IsNotEmpty({
    message: 'All fields are required',
  })
  username: string;
}
export class MediaUpdate {
  title?: string;
  username?: string;
}
