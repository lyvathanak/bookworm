import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // Protect these routes, only logged-in users can have a cart
@Controller('cart') // This is the public-facing endpoint for users
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    const userId = req.user.userId; // Get user ID from the JWT token
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Get()
  getCart(@Request() req) {
    const userId = req.user.userId;
    return this.cartService.getCartForUser(userId);
  }

  @Delete('item/:cartItemId')
  removeFromCart(@Request() req, @Param('cartItemId') cartItemId: string) {
    const userId = req.user.userId;
    return this.cartService.removeItemFromCart(userId, +cartItemId);
  }
}
