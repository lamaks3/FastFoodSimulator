import { FullOrder } from 'src/types/fullOrder';

export type ShortOrder = Pick<FullOrder, 'customerName' | 'id'>;
