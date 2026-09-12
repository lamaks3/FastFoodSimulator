import { Injectable } from '@nestjs/common';
import { OrderDto } from './types/order.type';
import { CreateOrderDto } from './dto/createOrder.dto';
import { DataStorageService } from 'src/data/dataStorage.service';
import { SseService } from 'src/sse/sse.service';
import { fullOrdersToShortOrders } from 'src/utils/fullOrdersToShortOrders';
import { fullOrderToKitchenOrder } from 'src/utils/fullOrderToKitchenOrder';
import { FullOrder } from 'src/types/fullOrder';
@Injectable()
export class OrdersService {
  constructor(
    private readonly dataStorageService: DataStorageService,
    private readonly sseService: SseService,
  ) {}
  getOrders(): OrderDto {
    const orders = this.dataStorageService.getOrders();

    return {
      ready: fullOrdersToShortOrders(orders.ready),
      notReady: fullOrdersToShortOrders(orders.notReady),
    };
  }
  createOrder(order: CreateOrderDto): FullOrder {
    const createdOrder = this.dataStorageService.addOrder(
      order.customerName,
      order.dishes,
    );
    const { dishes, ...shortOrder } = createdOrder;

    this.sseService.addOrder(createdOrder.id, shortOrder);
    this.sseService.addKitchenOrder(
      createdOrder.id,
      fullOrderToKitchenOrder(createdOrder),
    );
    return createdOrder;
  }
  removeOrderFromReady(id: number) {
    this.dataStorageService.removeOrderFromReady(id);
    this.sseService.removeReadyOrder(id);
  }
}
