export declare function formatQueryDate(d: Date): string;
export declare function getDateMidnight(d: Date): Date;
export declare function getPreviousMonday(d: Date): Date;
export declare function addDays(d: Date, amount: number): Date;
/**
 * Adds hours to a date
 * @param d The date
 * @param amount Number of hours
 * @returns The date, with added hours
 */
export declare function addHours(d: Date, amount: number): Date;
/**
 * Adds time (in MS) to a date
 * @param d The date
 * @param amount Time in milliseconds
 * @returns The date, with added time
 */
export declare function addTime(d: Date, amount: number): Date;
/**
 * Returns a new date with set time
 * @param d
 * @param hours
 * @param min
 * @param sec
 * @param ms
 * @returns
 */
export declare function setHours(d: Date, hours: number, min?: number, sec?: number, ms?: number): Date;
export declare function joinDateHour(d: string, h: string): Date;
export declare function getHHMM(d: Date): string;
export declare function getTimeString(d: Date): string;
