export type DayReq = {
	tool_ids: Array<string>;
	start: Date;
	end: Date;
};

export type BookToolsReq = {
	days: Array<DayReq>;
};
