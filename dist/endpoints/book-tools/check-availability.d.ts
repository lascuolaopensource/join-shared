export declare type ToolNeedsDay = {
    id: number;
    tools: Array<string>;
    hours: number;
};
export declare type BookToolsCheckAvailabilityReq = {
    days: Array<ToolNeedsDay>;
    start: string;
};
export declare enum DayResKind {
    Single = "single",
    Multiple = "multiple"
}
export declare type DayRes<K, T> = {
    kind: K;
    data: T;
};
export declare type SingleDayResData = Array<[string, string]>;
export interface SingleDayRes extends DayRes<DayResKind.Single, SingleDayResData> {
}
export declare type MultipleDayResData = Array<Array<Array<[string, string]>>>;
export interface MultipleDayRes extends DayRes<DayResKind.Multiple, MultipleDayResData> {
}
export declare type BookToolsCheckAvailabilityRes = SingleDayRes | MultipleDayRes;
