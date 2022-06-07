/**
 * Adds days to a date, returning a copy
 * @param d The date
 * @param amount Number of days
 * @returns A copy of the date, updated
 */

export function addDays(d: Date, amount: number): Date {
	const d_copy = new Date(d.getTime());
	const diff = d.getDate() + amount;
	d_copy.setDate(diff);
	return d_copy;
}

/**
 * Adds hours to a date, returning a copy
 * @param d The date
 * @param amount Number of hours
 * @returns A copy of the date, updated
 */

export function addHours(d: Date, amount: number): Date {
	const d_copy = new Date(d.getTime());
	const diff = d.getHours() + amount;
	d_copy.setHours(diff);
	return d_copy;
}

/**
 * Adds time (in MS) to a date, returning a copy
 * @param d The date
 * @param amount Time in milliseconds
 * @returns A copy of the date, updated
 */

export function addTime(d: Date, amount: number): Date {
	const d_copy = new Date(d.getTime() + amount);
	return d_copy;
}

/**
 * Sets date hours, mins, secs, ms, returning a copy
 * @param d The date
 * @param hours Hours
 * @param min Minutes
 * @param sec Seconds
 * @param ms Milliseconds
 * @returns A copy of the date, updated
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

//

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

/**
 * Splits the day in time slots
 * @param ms The length of the slot, in MS
 * @returns An array with all the start times of the slots
 */

export function splitDayInSlots(ms: number): Array<number> {
	const iterations = Math.round((24 * 60 * 60 * 1000) / ms);
	const slots = [];
	for (let i = 0; i < iterations; i++) {
		slots.push(ms * i);
	}
	return slots;
}
