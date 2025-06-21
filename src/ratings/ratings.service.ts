
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating, RatingStatus } from './entities/rating.entity'; // <-- ADD RatingStatus TO THIS IMPORT

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
  ) {}

  findAllForAdmin(): Promise<Rating[]> {
    return this.ratingsRepository.find({ 
      relations: ['user', 'book'],
      order: { created_at: 'DESC' } 
    });
  }
  
  async updateStatus(id: number, status: RatingStatus): Promise<Rating> {
    const rating = await this.ratingsRepository.findOneBy({ rating_id: id });
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }
    rating.status = status;
    return this.ratingsRepository.save(rating);
  }

  async remove(id: number): Promise<void> {
    await this.ratingsRepository.delete(id);
  }
}