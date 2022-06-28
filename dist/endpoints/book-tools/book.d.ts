export declare type DayReq = {
    tool_ids: Array<string>;
    start: string;
    end: string;
};
export declare type BookToolsReq = {
    days: Array<DayReq>;
};
