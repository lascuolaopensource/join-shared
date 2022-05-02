export type BookToolsDay = {
	tool_ids: Array<string>;
	date: string;
	time_start: string;
	time_end: string;
};

export type BookToolsReq = {
	days: Array<BookToolsDay>;
};
