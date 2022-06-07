/**
 * Adds days to a date, returning a copy
 * @param d The date
 * @param amount Number of days
 * @returns A copy of the date, updated
 */
export declare function addDays(d: Date, amount: number): Date;
/**
 * Adds hours to a date, returning a copy
 * @param d The date
 * @param amount Number of hours
 * @returns A copy of the date, updated
 */
export declare function addHours(d: Date, amount: number): Date;
/**
 * Adds time (in MS) to a date, returning a copy
 * @param d The date
 * @param amount Time in milliseconds
 * @returns A copy of the date, updated
 */
export declare function addTime(d: Date, amount: number): Date;
/**
 * Sets date hours, mins, secs, ms, returning a copy
 * @param d The date
 * @param hours Hours
 * @param min Minutes
 * @param sec Seconds
 * @param ms Milliseconds
 * @returns A copy of the date, updated
 */
export declare function setHours(d: Date, hours: number, min?: number, sec?: number, ms?: number): Date;
export declare function formatQueryDate(d: Date): string;
export declare function getDateMidnight(d: Date): Date;
export declare function getPreviousMonday(d: Date): Date;
export declare function joinDateHour(d: string, h: string): Date;
export declare function getHHMM(d: Date): string;
export declare function getTimeString(d: Date): string;
/**
 * Splits the day in time slots
 * @param ms The length of the slot, in MS
 * @returns An array with all the start times of the slots
 */
export declare function splitDayInSlots(ms: number): Array<number>;
/**
 *
 * @param ms The time in milliseconds
 * @returns The milliseconds of that time
 */
export declare function msToMilliseconds(ms: number): number;
/**
 *
 * @param ms The time in milliseconds
 * @returns The seconds of that time
 */
export declare function msToSeconds(ms: number): number;
/**
 *
 * @param ms The time in milliseconds
 * @returns The minutes of that time
 */
export declare function msToMinutes(ms: number): number;
/**
 *
 * @param ms The time in milliseconds
 * @returns The hours of that time
 */
export declare function msToHours(ms: number): number;
/**
 *
 * @param ms The time in milliseconds
 * @returns The hours, minutes, seconds of that time
 */
export declare function msToTime(ms: number): {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};
/**
 *
 * @param ms The time in milliseconds
 * @returns The hours and mins of that time formatted as HH:MM
 */
export declare function msToHHMM(ms: number): string;
