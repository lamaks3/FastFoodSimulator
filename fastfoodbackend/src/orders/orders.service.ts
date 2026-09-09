import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.type';
import { ShortOrder } from './types/shortOrder';
import { CreateOrderDto } from './types/createOrder.dto';
import { DataStorageService } from 'src/data/dataStorage.service';
import { FullOrder } from 'src/types/fullOrder';

@Injectable()
export class OrdersService {
  constructor(private readonly dataStorageService: DataStorageService) {}
  async getOrders(): Promise<OrderDto> {
    const orders = this.dataStorageService.getOrders();

    return {
      ready: this.fullOrderToShortOrder(orders.ready),
      notReady: this.fullOrderToShortOrder(orders.notReady),
    };
  }
  async createOrder(order: CreateOrderDto): Promise<ShortOrder> {
    const createdOrder = this.dataStorageService.addOrder(
      order.customerName,
      order.dishes,
    );
    const { dishes, ...shortOrder } = createdOrder;
    return shortOrder;
  }
  async removeOrderFromReady(id: number) {
    const deleteOrder = this.dataStorageService.removeOrderFromReady(id);
  }
  private fullOrderToShortOrder(orders: FullOrder[]): ShortOrder[] {
    return orders.map((order) => {
      return {
        id: order.id,
        customerName: order.customerName,
      };
    });
  }
}
