import { FullOrder } from "./fullOrder";
export type ShortOrder = Pick<FullOrder, 'customerName' | 'id'>;
