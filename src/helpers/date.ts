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
