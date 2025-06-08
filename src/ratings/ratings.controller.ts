import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('ratings')
export class RatingsController {
    constructor(private readonly ratingsService: RatingsService) {}

    @Get()
    findAll() {
        return this.ratingsService.findAllForAdmin();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ratingsService.remove(+id);
    }
}
