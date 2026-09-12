import { FullOrder } from 'src/types/fullOrder';

export type KitchenOrder = Pick<FullOrder, 'id' | 'dishes'>;
