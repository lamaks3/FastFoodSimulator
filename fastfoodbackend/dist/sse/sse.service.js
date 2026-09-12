"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SseService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let SseService = class SseService {
    constructor() {
        this._kitchenSse = new rxjs_1.Subject();
        this._ordersSse = new rxjs_1.Subject();
        this._readyOrdersSse = new rxjs_1.Subject();
    }
    _kitchenSse;
    _ordersSse;
    _readyOrdersSse;
    get kitchenSse() {
        return this._kitchenSse.asObservable();
    }
    get ordersSse() {
        return this._ordersSse.asObservable();
    }
    get readyOrdersSse() {
        return this._readyOrdersSse.asObservable();
    }
    removeOrder(id) {
        const command = {
            orderId: id,
            command: 'remove',
        };
        this._ordersSse.next({ data: command });
    }
    addOrder(id, order) {
        const command = {
            orderId: id,
            command: 'add',
            order,
        };
        this._ordersSse.next({ data: command });
    }
    addReadyOrder(id, order) {
        const command = {
            orderId: id,
            command: 'add',
            order,
        };
        this._readyOrdersSse.next({ data: command });
    }
    removeReadyOrder(id) {
        const command = {
            orderId: id,
            command: 'remove',
        };
        this._readyOrdersSse.next({ data: command });
    }
    addKitchenOrder(id, order) {
        const command = {
            orderId: id,
            command: 'add',
            order,
        };
        this._kitchenSse.next({ data: command });
    }
    removeKitchenOrder(id) {
        const command = {
            orderId: id,
            command: 'remove',
        };
        this._kitchenSse.next({ data: command });
    }
};
exports.SseService = SseService;
exports.SseService = SseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SseService);
//# sourceMappingURL=sse.service.js.map