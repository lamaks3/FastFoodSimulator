import { Body, Controller, Get, Post } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenOrderDto } from './dto/kitchenOrder.dto';

@Controller('kitchen')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}
  @Get()
  getKitchenOrders() {
    return this.kitchenService.getKitchenOrders();
  }
  @Post('/cook')
  moveOrderToReady(@Body() kitchenOrder: KitchenOrderDto) {
    this.kitchenService.cookOrder(kitchenOrder);
  }
}
