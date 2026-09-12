import { IsNumber, IsPositive } from 'class-validator';

export class KitchenOrderDto {
  @IsNumber()
  @IsPositive()
  id!: number;
}
