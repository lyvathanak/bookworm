
import { Controller, Get, Delete, Param, UseGuards, Patch, Body } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RatingStatus } from './entities/rating.entity'; // <-- ADD THIS IMPORT
import { UpdateRatingStatusDto } from './dto/update-rating-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('ratings')
export class RatingsController {
    constructor(private readonly ratingsService: RatingsService) {}

    @Get()
    findAll() {
        return this.ratingsService.findAllForAdmin();
    }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateDto: UpdateRatingStatusDto) {
    return this.ratingsService.updateStatus(+id, updateDto.status);
  }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ratingsService.remove(+id);
    }
}