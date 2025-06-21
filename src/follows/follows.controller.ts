// Create this new file: src/follows/follows.controller.ts

import { Controller, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('authors/:authorId') // Route will be nested under authors
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post('follow')
  follow(@Request() req, @Param('authorId') authorId: string) {
    const userId = req.user.userId;
    return this.followsService.follow(userId, +authorId);
  }

  @Delete('unfollow')
  unfollow(@Request() req, @Param('authorId') authorId: string) {
    const userId = req.user.userId;
    return this.followsService.unfollow(userId, +authorId);
  }
}