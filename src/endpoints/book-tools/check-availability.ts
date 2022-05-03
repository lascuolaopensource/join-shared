export type BookToolsCheckAvailabilityDay = {
	tool_ids: Array<string>;
	hours: number;
};

export type BookToolsCheckAvailabilityReq = {
	days: Array<BookToolsCheckAvailabilityDay>;
};
