import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePost {
  @IsNotEmpty({
    message: 'title is required',
  })
  @IsString()
  title: string;
  @IsNotEmpty({
    message: 'text is required',
  })
  @IsString()
  text: string;

  image?: string;
}
export class UpdatePost {
  @IsNotEmpty({
    message: 'title is required',
  })
  @IsString()
  title: string;
  @IsNotEmpty({
    message: 'text is required',
  })
  @IsString()
  text: string;

  image?: string;
}
