export function formatQueryDate(d: Date) {
	return d.toISOString().split("T")[0];
}
