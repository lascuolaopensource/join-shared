import { Enum_Toolslot_Type } from "../../types";
export declare type SlotUpdate = {
    toolID: string;
    dateTime: string;
    state: Enum_Toolslot_Type | null;
};
export declare type AdminToolsUpdateSlotsReq = {
    changes: Array<SlotUpdate>;
};
