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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitchenController = void 0;
const common_1 = require("@nestjs/common");
const kitchen_service_1 = require("./kitchen.service");
const kitchenOrder_dto_1 = require("./dto/kitchenOrder.dto");
let KitchenController = class KitchenController {
    kitchenService;
    constructor(kitchenService) {
        this.kitchenService = kitchenService;
    }
    getKitchenOrders() {
        return this.kitchenService.getKitchenOrders();
    }
    moveOrderToReady(kitchenOrder) {
        this.kitchenService.cookOrder(kitchenOrder);
    }
};
exports.KitchenController = KitchenController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KitchenController.prototype, "getKitchenOrders", null);
__decorate([
    (0, common_1.Post)('/cook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kitchenOrder_dto_1.KitchenOrderDto]),
    __metadata("design:returntype", void 0)
], KitchenController.prototype, "moveOrderToReady", null);
exports.KitchenController = KitchenController = __decorate([
    (0, common_1.Controller)('kitchen'),
    __metadata("design:paramtypes", [kitchen_service_1.KitchenService])
], KitchenController);
//# sourceMappingURL=kitchen.controller.js.map