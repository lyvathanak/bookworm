// In lyvathanak/bookworm/bookworm-backend/src/orders/orders.controller.ts

// Add Post and Body to imports
import { Controller, Get, Param, Patch, Body, UseGuards, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminCreateOrderDto } from './dto/admin-create-order.dto'; // Import the new DTO

@UseGuards(JwtAuthGuard)
@Controller('admin/orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    // ADD THIS NEW ENDPOINT
    @Post()
    create(@Body() adminCreateOrderDto: AdminCreateOrderDto) {
        const { userId, ...createOrderDto } = adminCreateOrderDto;
        return this.ordersService.create(userId, createOrderDto);
    }

    @Get()
    findAll() { return this.ordersService.findAll(); }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.ordersService.updateStatus(+id, status);
    }
}