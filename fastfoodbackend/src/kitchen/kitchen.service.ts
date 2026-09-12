import { Injectable, NotFoundException } from '@nestjs/common';
import { DataStorageService } from 'src/data/dataStorage.service';
import { KitchenOrderDto } from './dto/kitchenOrder.dto';
import { fullOrdersToKitchenOrders } from 'src/utils/fullOrderToKitchenOrder';
import { SseService } from 'src/sse/sse.service';
import { fullOrderToShortOrder } from 'src/utils/fullOrdersToShortOrders';

@Injectable()
export class KitchenService {
  constructor(
    private readonly dataStorageService: DataStorageService,
    private readonly sseService: SseService,
  ) {}
  getKitchenOrders() {
    return fullOrdersToKitchenOrders(
      this.dataStorageService.getOrders().notReady,
    );
  }
  cookOrder({ id }: KitchenOrderDto) {
    const order = this.dataStorageService.findOrder(id);
    if (order === undefined) throw new NotFoundException('Order not found');
    this.dataStorageService.removeOrderFromNotReady(order.id);
    this.dataStorageService.addOrderToReady(order);
    this.sseService.removeOrder(id);
    this.sseService.addReadyOrder(id, fullOrderToShortOrder(order));
    this.sseService.removeKitchenOrder(id);
  }
}
