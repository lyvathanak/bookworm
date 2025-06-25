import { Controller, Post, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { PublicRatingsService } from './public-ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books/:bookId/ratings')
export class PublicRatingsController {
  constructor(private readonly publicRatingsService: PublicRatingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  // FIX: Get bookId from @Param and use ParseIntPipe to ensure it's a number
  create(
    @Request() req,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    const userId = req.user.userId;
    return this.publicRatingsService.create(userId, bookId, createRatingDto);
  }
}