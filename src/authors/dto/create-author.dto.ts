import { IsString, IsDateString, IsOptional, IsUrl } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  author_name: string;

  @IsString()
  @IsOptional()
  bio?: string;
  
  @IsString() // Changed from IsDateString to match entity
  @IsOptional()
  dob?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;
}

