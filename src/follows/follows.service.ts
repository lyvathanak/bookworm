
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { User } from '../users/entities/user.entity';
import { Author } from '../authors/entities/author.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private followsRepository: Repository<Follow>,
  ) {}

  async follow(userId: number, authorId: number): Promise<void> {
    const existing = await this.followsRepository.findOne({
      where: { user: { uid: userId }, author: { author_id: authorId } },
    });

    if (existing) {
      throw new ConflictException('User already follows this author');
    }

    const follow = this.followsRepository.create({
      user: { uid: userId } as User,
      author: { author_id: authorId } as Author,
    });
    
    await this.followsRepository.save(follow);
  }

  async unfollow(userId: number, authorId: number): Promise<void> {
    const result = await this.followsRepository.delete({
      user: { uid: userId },
      author: { author_id: authorId },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Follow relationship not found');
    }
  }
}