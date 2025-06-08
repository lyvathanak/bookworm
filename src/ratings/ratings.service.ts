import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
  ) {}

  // For Admin: Find all ratings for moderation
  findAllForAdmin(): Promise<Rating[]> {
    return this.ratingsRepository.find({ relations: ['user', 'book'] });
  }
  
  // For Admin: Delete a rating
  async remove(id: number): Promise<void> {
    await this.ratingsRepository.delete(id);
  }

  // For User: Create a new rating
  // This logic would be more complex, checking if the user purchased the book, etc.
  // createForUser(...)
}
