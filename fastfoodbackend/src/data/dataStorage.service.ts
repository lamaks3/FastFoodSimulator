import { Injectable } from '@nestjs/common';
import { OrderStorage } from './types/orderStorage.type';
import { FullOrder } from 'src/types/fullOrder';

@Injectable()
export class DataStorageService {
  constructor() {
    this.orders = { ready: [], notReady: [] };
    this.maxId = 0;
  }
  private orders: OrderStorage;
  private maxId: number;

  getOrders() {
    return this.orders;
  }
  addOrder(customerName: string, dishes: string[]) {
    this.maxId++;
    const order: FullOrder = {
      customerName,
      dishes,
      id: this.maxId,
    };
    this.orders.ready.push(order);
    return order;
  }
  findOrder(id: number) {
    return this.orders.ready.find((order) => order.id === id);
  }
  removeOrderFromNotReady(id: number) {
    this.orders.notReady = this.orders.notReady.filter(
      (order) => order.id !== id,
    );
  }
  addOrderToReady(fullOrder: FullOrder) {
    this.orders.ready.push(fullOrder);
  }
  removeOrderFromReady(id: number) {
    this.orders.ready = this.orders.ready.filter((order) => order.id !== id);
  }
}
