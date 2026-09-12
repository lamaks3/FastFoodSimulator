import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get('')
  async getOrders() {
    const result = this.ordersService.getOrders();
    return result;
  }
  @Post('')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const result = this.ordersService.createOrder(createOrderDto);
    return result;
  }
  @Delete(':id')
  async removeOrderFromReady(@Param('id', ParseIntPipe) id: number) {
    const result = await this.ordersService.removeOrderFromReady(id);
  }
}
