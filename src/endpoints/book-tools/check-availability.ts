export type ToolNeedsDay = {
	id: number;
	tools: Array<string>;
	hours: number;
};

export type BookToolsCheckAvailabilityReq = {
	days: Array<ToolNeedsDay>;
	start: string;
};

export enum DayResKind {
	Single = "single",
	Multiple = "multiple",
}

export type DayRes<K, T> = {
	kind: K;
	data: T;
};

export type SingleDayResData = Record<string, Array<[Date, Date]>>;
export interface SingleDayRes
	extends DayRes<DayResKind.Single, SingleDayResData> {}

export type MultipleDayResData = Array<
	Array<{ day: string; options: Array<[Date, Date]> }>
>;
export interface MultipleDayRes
	extends DayRes<DayResKind.Multiple, MultipleDayResData> {}

export type BookToolsCheckAvailabilityRes = SingleDayRes | MultipleDayRes;
