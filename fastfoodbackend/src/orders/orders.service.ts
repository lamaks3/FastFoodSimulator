import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.type';
import { ShortOrder } from './types/shortOrder';
import { CreateOrderDto } from './types/createOrder.dto';

@Injectable()
export class OrdersService {
  async getOrders(): Promise<OrderDto> {
    return {
      ready: [],
      notReady: [],
    };
  }
  async createOrder(order: CreateOrderDto): Promise<ShortOrder> {
    return {
      id: 1,
      ...order,
    };
  }
  async deleteOrder(id: number) {
    return;
  }
}
