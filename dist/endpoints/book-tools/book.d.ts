export declare type DayReq = {
    tool_ids: Array<string>;
    start: Date;
    end: Date;
};
export declare type BookToolsReq = {
    days: Array<DayReq>;
};
