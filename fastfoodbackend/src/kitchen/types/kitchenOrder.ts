import { FullOrder } from 'src/types/fullOrder';

export type kitchenOrder = Pick<FullOrder, 'id' | 'dishes'>;
