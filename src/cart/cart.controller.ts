import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    const userId = req.user.userId;
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Get()
  getCart(@Request() req) {
    const userId = req.user.userId;
    return this.cartService.getCartForUser(userId);
  }

  @Patch('item/:cartItemId')
  updateItem(
    @Request() req,
    @Param('cartItemId') cartItemId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    const userId = req.user.userId;
    return this.cartService.updateItemQuantity(userId, +cartItemId, updateCartDto);
  }

  @Delete('item/:cartItemId')
  removeFromCart(@Request() req, @Param('cartItemId') cartItemId: string) {
    const userId = req.user.userId;
    return this.cartService.removeItemFromCart(userId, +cartItemId);
  }

  @Delete('clear')
  clearCart(@Request() req) {
    const userId = req.user.userId;
    return this.cartService.clearCart(userId);
  }
}