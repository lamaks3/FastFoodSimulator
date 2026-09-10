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
exports.KitchenService = void 0;
const common_1 = require("@nestjs/common");
const dataStorage_service_1 = require("../data/dataStorage.service");
let KitchenService = class KitchenService {
    dataStorageService;
    constructor(dataStorageService) {
        this.dataStorageService = dataStorageService;
    }
    getKitchenOrders() {
        return this.fullOrdersToKitchenOrders(this.dataStorageService.getOrders().notReady);
    }
    cookOrder({ id }) {
        const order = this.dataStorageService.findOrder(id);
        if (order === undefined)
            throw new common_1.NotFoundException('Order not found');
        this.dataStorageService.removeOrderFromNotReady(order.id);
        this.dataStorageService.addOrderToReady(order);
    }
    fullOrdersToKitchenOrders(orders) {
        return orders.map((order) => {
            return {
                id: order.id,
                dishes: order.dishes,
            };
        });
    }
};
exports.KitchenService = KitchenService;
exports.KitchenService = KitchenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dataStorage_service_1.DataStorageService])
], KitchenService);
//# sourceMappingURL=kitchen.service.js.map