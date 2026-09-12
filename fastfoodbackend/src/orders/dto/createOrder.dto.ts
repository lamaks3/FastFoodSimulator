import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerName!: string;
  @IsArray()
  @IsString({ each: true })
  dishes!: string[];
}
