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
  removeOrderFromReady(id: number) {
    this.orders.ready = this.orders.ready.filter((order) => order.id !== id);
  }
}
