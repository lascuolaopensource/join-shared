import { Enum_Toolslot_Type } from "../../types";
export declare type SlotChange = {
    toolID: string;
    dateTime: Date;
    state: Enum_Toolslot_Type | null;
};
export declare type AdminToolsChangeSlotStateReq = {
    changes: Array<SlotChange>;
};
