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
exports.SseController = void 0;
const common_1 = require("@nestjs/common");
const sse_service_1 = require("./sse.service");
let SseController = class SseController {
    sseService;
    constructor(sseService) {
        this.sseService = sseService;
    }
    ordersSse() {
        return this.sseService.ordersSse;
    }
    kitchenSse() {
        return this.sseService.kitchenSse;
    }
    readySse() {
        return this.sseService.readyOrdersSse;
    }
};
exports.SseController = SseController;
__decorate([
    (0, common_1.Sse)('/orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SseController.prototype, "ordersSse", null);
__decorate([
    (0, common_1.Sse)('/kitchen'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SseController.prototype, "kitchenSse", null);
__decorate([
    (0, common_1.Sse)('/ready'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SseController.prototype, "readySse", null);
exports.SseController = SseController = __decorate([
    (0, common_1.Controller)('sse'),
    __metadata("design:paramtypes", [sse_service_1.SseService])
], SseController);
//# sourceMappingURL=sse.controller.js.map