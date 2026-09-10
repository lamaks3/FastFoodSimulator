import { Injectable, NotFoundException } from '@nestjs/common';
import { DataStorageService } from 'src/data/dataStorage.service';
import { FullOrder } from 'src/types/fullOrder';
import { KitchenOrderDto } from './dto/kitchenOrder.dto';

@Injectable()
export class KitchenService {
  constructor(private readonly dataStorageService: DataStorageService) {}
  getKitchenOrders() {
    return this.fullOrdersToKitchenOrders(
      this.dataStorageService.getOrders().notReady,
    );
  }
  cookOrder({ id }: KitchenOrderDto) {
    const order = this.dataStorageService.findOrder(id);
    if (order === undefined) throw new NotFoundException('Order not found');
    this.dataStorageService.removeOrderFromNotReady(order.id);
    this.dataStorageService.addOrderToReady(order);
  }
  private fullOrdersToKitchenOrders(orders: FullOrder[]): KitchenOrderDto[] {
    return orders.map((order) => {
      return {
        id: order.id,
        dishes: order.dishes,
      };
    });
  }
}
