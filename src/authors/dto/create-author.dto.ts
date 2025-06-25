import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  author_name: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  dob?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;
}

