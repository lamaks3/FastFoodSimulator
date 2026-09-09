import { FullOrder } from "../../types/fullOrder";
export type OrderStorage = {
    ready: FullOrder[];
    notReady: FullOrder[];
};
