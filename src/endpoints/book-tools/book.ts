export type BookToolsBookDay = {
	tool_ids: Array<string>;
	date: string;
	time_start: string;
	time_end: string;
};

export type BookToolsBookReq = {
	days: Array<BookToolsBookDay>;
};
