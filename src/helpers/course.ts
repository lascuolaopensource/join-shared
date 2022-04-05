import { Course } from "../types";

export function isPaymentNeeded(c: Course): boolean {
	return c.price > 0;
}

export function isEvaluationNeeded(c: Course): boolean {
	return c.cvNeeded || c.motivationalLetterNeeded || c.portfolioNeeded;
}

export function isEnrollable(c: Course): boolean {
	return Date.now() < Date.parse(c.enrollmentDeadline);
}

export function getStartDate(c: Course): string {
	return c.meetings[0].date;
}

export function getEndDate(c: Course): string {
	return c.meetings[c.meetings.length - 1].date;
}
