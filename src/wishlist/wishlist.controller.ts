import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddToWishlistDto } from './dto/add-to-wishlist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('add')
  addToWishlist(@Request() req, @Body() addToWishlistDto: AddToWishlistDto) {
    const userId = req.user.userId;
    return this.wishlistService.addToWishlist(userId, addToWishlistDto.bookId);
  }

  @Get()
  getWishlist(@Request() req) {
    const userId = req.user.userId;
    return this.wishlistService.getWishlistForUser(userId);
  }

  @Delete('item/:bookId')
  removeFromWishlist(@Request() req, @Param('bookId') bookId: string) {
    const userId = req.user.userId;
    return this.wishlistService.removeFromWishlist(userId, +bookId);
  }
}
