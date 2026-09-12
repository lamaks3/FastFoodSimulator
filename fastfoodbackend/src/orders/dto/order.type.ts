import { ShortOrder } from '../../types/shortOrder';

export type OrderDto = {
  ready: ShortOrder[];
  notReady: ShortOrder[];
};
