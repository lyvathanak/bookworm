import { IsEnum } from 'class-validator';
import { RatingStatus } from '../entities/rating.entity';

export class UpdateRatingStatusDto {
  @IsEnum(RatingStatus)
  status: RatingStatus;
}