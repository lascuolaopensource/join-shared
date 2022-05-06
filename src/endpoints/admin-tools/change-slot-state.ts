import { Enum_Toolslot_Type } from "../../types";

export type SlotChange = {
	toolID: string;
	dateTime: Date;
	state: Enum_Toolslot_Type | null;
};

export type AdminToolsChangeSlotStateReq = {
	changes: Array<SlotChange>;
};
