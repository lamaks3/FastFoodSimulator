export class CreateOrderDto {
  constructor(customerName: string, dishes: string[]) {
    this.customerName = customerName;
    this.dishes = dishes;
  }

  customerName: string;
  dishes: string[];
}
