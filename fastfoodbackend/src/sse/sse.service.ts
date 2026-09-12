import { Injectable, MessageEvent } from '@nestjs/common';
import { Subject } from 'rxjs';
import { SseCreateCommand, SseRemoveCommand } from './types/sseType';
import { ShortOrder } from 'src/types/shortOrder';
import { KitchenOrder } from 'src/types/kitchenOrder';
import { HEARTBEAT_INTERVAL } from 'src/constants';

@Injectable()
export class SseService {
  constructor() {
    this._kitchenSse = new Subject();
    setInterval(
      () => this._kitchenSse.next({ data: 'heartbeat' }),
      HEARTBEAT_INTERVAL,
    );
    this._ordersSse = new Subject();
    setInterval(
      () => this._ordersSse.next({ data: 'heartbeat' }),
      HEARTBEAT_INTERVAL,
    );
    this._readyOrdersSse = new Subject();
    setInterval(
      () => this._readyOrdersSse.next({ data: 'heartbeat' }),
      HEARTBEAT_INTERVAL,
    );
  }
  private _kitchenSse: Subject<MessageEvent>;
  private _ordersSse: Subject<MessageEvent>;
  private _readyOrdersSse: Subject<MessageEvent>;
  get kitchenSse() {
    return this._kitchenSse.asObservable();
  }
  get ordersSse() {
    return this._ordersSse.asObservable();
  }
  get readyOrdersSse() {
    return this._readyOrdersSse.asObservable();
  }
  removeOrder(id: number) {
    const command: SseRemoveCommand = {
      orderId: id,
      command: 'remove',
    };
    this._ordersSse.next({ data: command });
  }
  addOrder(id: number, order: ShortOrder) {
    const command: SseCreateCommand<ShortOrder> = {
      orderId: id,
      command: 'add',
      order,
    };
    this._ordersSse.next({ data: command });
  }
  addReadyOrder(id: number, order: ShortOrder) {
    const command: SseCreateCommand<ShortOrder> = {
      orderId: id,
      command: 'add',
      order,
    };
    this._readyOrdersSse.next({ data: command });
  }
  removeReadyOrder(id: number) {
    const command: SseRemoveCommand = {
      orderId: id,
      command: 'remove',
    };
    this._readyOrdersSse.next({ data: command });
  }
  addKitchenOrder(id: number, order: KitchenOrder) {
    const command: SseCreateCommand<KitchenOrder> = {
      orderId: id,
      command: 'add',
      order,
    };
    this._kitchenSse.next({ data: command });
  }
  removeKitchenOrder(id: number) {
    const command: SseRemoveCommand = {
      orderId: id,
      command: 'remove',
    };
    this._kitchenSse.next({ data: command });
  }
}
