import { FullOrder } from 'src/types/fullOrder';

export type OrderStorage = {
  ready: FullOrder[];
  notReady: FullOrder[];
};
