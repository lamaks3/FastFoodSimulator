import { FullOrder } from "./fullOrder";
export type KitchenOrder = Pick<FullOrder, 'id' | 'dishes'>;
