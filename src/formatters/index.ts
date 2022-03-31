export const formatPriceNumber = (
	price: number,
	locale = "IT-it",
	currency = "EUR"
) => {
	const formatter = new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	});
	return formatter.format(price);
};

export const formatDateString = (date: string, locale = "IT-it") => {
	const d = new Date(Date.parse(date));
	return d.toLocaleDateString(locale, {
		month: "2-digit",
		day: "2-digit",
		year: "2-digit",
	});
};
