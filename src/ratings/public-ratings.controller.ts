import { Controller, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PublicRatingsService } from './public-ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books/:bookId/ratings')
export class PublicRatingsController {
  constructor(private readonly publicRatingsService: PublicRatingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req,
    @Param('bookId') bookId: string,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    const userId = req.user.userId;
    // Ensure the bookId from the DTO matches the URL param
    createRatingDto.bookId = +bookId; 
    return this.publicRatingsService.create(userId, createRatingDto);
  }
}