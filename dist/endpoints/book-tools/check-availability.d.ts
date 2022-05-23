export declare type BookToolsCheckAvailabilityDay = {
    tool_ids: Array<string>;
    hours: number;
};
export declare type BookToolsCheckAvailabilityReq = {
    days: Array<BookToolsCheckAvailabilityDay>;
};
export declare enum DayResKind {
    Single = "single",
    Multiple = "multiple"
}
export declare type DayRes<K, T> = {
    kind: K;
    data: T;
};
export declare type SingleDayResData = Record<string, Array<[Date, Date]>>;
export declare type SingleDayRes = DayRes<DayResKind.Single, SingleDayResData>;
export declare type MultipleDayResData = Array<Array<{
    day: string;
    options: Array<[Date, Date]>;
}>>;
export declare type MultipleDayRes = DayRes<DayResKind.Multiple, MultipleDayResData>;
export declare type BookToolsCheckAvailabilityRes = {
    data: SingleDayRes | MultipleDayRes;
};
