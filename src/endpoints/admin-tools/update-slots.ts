import { Enum_Toolslot_Type } from "../../types";

export type SlotUpdate = {
	toolID: string;
	dateTime: string;
	state: Enum_Toolslot_Type | null;
};

export type AdminToolsUpdateSlotsReq = {
	changes: Array<SlotUpdate>;
};
