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
exports.DataStorageService = void 0;
const common_1 = require("@nestjs/common");
let DataStorageService = class DataStorageService {
    constructor() {
        this.orders = { ready: [], notReady: [] };
        this.maxId = 0;
    }
    orders;
    maxId;
    getOrders() {
        return this.orders;
    }
    addOrder(customerName, dishes) {
        this.maxId++;
        const order = {
            customerName,
            dishes,
            id: this.maxId,
        };
        this.orders.notReady.push(order);
        return order;
    }
    findOrder(id) {
        return this.orders.notReady.find((order) => order.id === id);
    }
    removeOrderFromNotReady(id) {
        this.orders.notReady = this.orders.notReady.filter((order) => order.id !== id);
    }
    addOrderToReady(fullOrder) {
        this.orders.ready.push(fullOrder);
    }
    removeOrderFromReady(id) {
        this.orders.ready = this.orders.ready.filter((order) => order.id !== id);
    }
};
exports.DataStorageService = DataStorageService;
exports.DataStorageService = DataStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DataStorageService);
//# sourceMappingURL=dataStorage.service.js.map