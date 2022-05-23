export type BookToolsCheckAvailabilityDay = {
	tool_ids: Array<string>;
	hours: number;
};

export type BookToolsCheckAvailabilityReq = {
	days: Array<BookToolsCheckAvailabilityDay>;
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
export type SingleDayRes = DayRes<DayResKind.Single, SingleDayResData>;

export type MultipleDayResData = Array<
	Array<{ day: string; options: Array<[Date, Date]> }>
>;
export type MultipleDayRes = DayRes<DayResKind.Multiple, MultipleDayResData>;

export type BookToolsCheckAvailabilityRes = SingleDayRes | MultipleDayRes;
