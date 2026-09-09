import { FullOrder } from "../../types/fullOrder";
export type ShortOrder = Pick<FullOrder, 'customerName' | 'id'>;
