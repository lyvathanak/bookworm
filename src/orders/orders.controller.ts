import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/orders')
export class OrdersController { // Corrected export
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    findAll() { return this.ordersService.findAll(); }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.ordersService.updateStatus(+id, status);
    }
}