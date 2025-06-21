import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders') // Public facing endpoint at /api/orders
export class PublicOrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('my-orders')
    getMyOrders(@Request() req) {
        const userId = req.user.userId;
        return this.ordersService.findForUser(userId);
    }

    @UseGuards(JwtAuthGuard) // Only authenticated users can place orders
    @Post('checkout')
    checkout(@Request() req, @Body() createOrderDto: CreateOrderDto) {
        const userId = req.user.userId; // Get user ID from JWT payload
        return this.ordersService.create(userId, createOrderDto);
    }
}
