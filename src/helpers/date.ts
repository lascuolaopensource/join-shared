import { string } from "yup";

export function formatQueryDate(d: Date) {
	return d.toISOString().split("T")[0];
}

export function getDateMidnight(d: Date) {
	const db = new Date(d.getTime());
	db.setHours(0, 0, 0, 0);
	return db;
}

export function getPreviousMonday(d: Date): Date {
	const day = d.getDay();
	const diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
	return new Date(d.setDate(diff));
}

export function addDays(d: Date, amount: number): Date {
	const d_copy = new Date(d.getTime());
	const diff = d.getDate() + amount;
	d_copy.setDate(diff);
	return d_copy;
}

/**
 * Adds hours to a date
 * @param d The date
 * @param amount Number of hours
 * @returns The date, with added hours
 */

export function addHours(d: Date, amount: number): Date {
	const d_copy = new Date(d.getTime());
	const diff = d.getHours() + amount;
	d_copy.setHours(diff);
	return d_copy;
}

/**
 * Adds time (in MS) to a date
 * @param d The date
 * @param amount Time in milliseconds
 * @returns The date, with added time
 */

export function addTime(d: Date, amount: number): Date {
	const d_copy = new Date(d.getTime() + amount);
	return d_copy;
}

/**
 * Returns a new date with set time
 * @param d
 * @param hours
 * @param min
 * @param sec
 * @param ms
 * @returns
 */

export function setHours(
	d: Date,
	hours: number,
	min = 0,
	sec = 0,
	ms = 0
): Date {
	const d_copy = new Date(d.getTime());
	d_copy.setHours(hours, min, sec, ms);
	return d_copy;
}

export function joinDateHour(d: string, h: string): Date {
	return new Date(Date.parse(`${d}T${h}Z`));
}

export function getHHMM(d: Date): string {
	const hour = String(d.getHours()).padStart(2, "0");
	const mins = String(d.getMinutes()).padStart(2, "0");

	return `${hour}:${mins}`;
}

export function getTimeString(d: Date): string {
	return d.toISOString().split("T")[1].replace("Z", "");
}
