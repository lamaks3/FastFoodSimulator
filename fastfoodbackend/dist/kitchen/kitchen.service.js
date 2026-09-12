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
const fullOrderToKitchenOrder_1 = require("../utils/fullOrderToKitchenOrder");
const sse_service_1 = require("../sse/sse.service");
const fullOrdersToShortOrders_1 = require("../utils/fullOrdersToShortOrders");
let KitchenService = class KitchenService {
    dataStorageService;
    sseService;
    constructor(dataStorageService, sseService) {
        this.dataStorageService = dataStorageService;
        this.sseService = sseService;
    }
    getKitchenOrders() {
        return (0, fullOrderToKitchenOrder_1.fullOrdersToKitchenOrders)(this.dataStorageService.getOrders().notReady);
    }
    cookOrder({ id }) {
        const order = this.dataStorageService.findOrder(id);
        if (order === undefined)
            throw new common_1.NotFoundException('Order not found');
        this.dataStorageService.removeOrderFromNotReady(order.id);
        this.dataStorageService.addOrderToReady(order);
        this.sseService.removeOrder(id);
        this.sseService.addReadyOrder(id, (0, fullOrdersToShortOrders_1.fullOrderToShortOrder)(order));
        this.sseService.removeKitchenOrder(id);
    }
};
exports.KitchenService = KitchenService;
exports.KitchenService = KitchenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dataStorage_service_1.DataStorageService,
        sse_service_1.SseService])
], KitchenService);
//# sourceMappingURL=kitchen.service.js.map