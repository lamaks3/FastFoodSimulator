import { Injectable, MessageEvent } from '@nestjs/common';
import { OrderDto } from './dto/order.type';
import { ShortOrder } from '../types/shortOrder';
import { CreateOrderDto } from './types/createOrder.dto';
import { DataStorageService } from 'src/data/dataStorage.service';
import { SseService } from 'src/sse/sse.service';
import { fullOrdersToShortOrders } from 'src/utils/fullOrdersToShortOrders';
import { fullOrderToKitchenOrder } from 'src/utils/fullOrderToKitchenOrder';
@Injectable()
export class OrdersService {
  constructor(
    private readonly dataStorageService: DataStorageService,
    private readonly sseService: SseService,
  ) {
    this.dataStorageService = dataStorageService;
  }
  getOrders(): OrderDto {
    const orders = this.dataStorageService.getOrders();

    return {
      ready: fullOrdersToShortOrders(orders.ready),
      notReady: fullOrdersToShortOrders(orders.notReady),
    };
  }
  createOrder(order: CreateOrderDto): ShortOrder {
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
    return shortOrder;
  }
  removeOrderFromReady(id: number) {
    const deleteOrder = this.dataStorageService.removeOrderFromReady(id);
    this.sseService.removeReadyOrder(id);
  }
}
