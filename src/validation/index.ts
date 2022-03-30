import * as yup from "yup";

/**
 * Setting yup default messages
 */

export function setYupDefaultMessages() {
	yup.setLocale({
		string: {
			matches: `Il campo non è valido`,
		},
	});
}

setYupDefaultMessages();

/**
 * Regex checks
 */

export const re = {
	url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
	cf: /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/,
	phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
	provincia: /^[A-Z]{2}$/,
	cap: /^[0-9]{5}$/,
	vat: /^[0-9]{11}$/,
	sdi: /^([0-9]|[A-Z]){6,7}$/,
	pec: /^(.*)@(?:\w*\.)*pec(?:\.\w+)+$/,
};

/**
 * Schemas
 */

export const urlSchema = yup.string().lowercase().matches(re.url);

export const cfSchema = yup.string().uppercase().matches(re.cf);
export const vatSchema = yup.string().matches(re.vat);
export const sdiSchema = yup.string().uppercase().matches(re.sdi);

export const phoneSchema = yup.string().matches(re.phone);
export const emailSchema = yup.string().email();
export const pecSchema = emailSchema.matches(re.pec);

export const provinciaSchema = yup.string().uppercase().matches(re.provincia);
export const capSchema = yup.string().matches(re.cap);

/**
 * Yup dynamic checks
 */

export function thenReq(value: boolean | string) {
	return {
		is: value,
		then: (schema: yup.AnySchema) => schema.required(),
		otherwise: (schema: yup.AnySchema) => schema.nullable().optional(),
	};
}

export function thenUrlReq(value: boolean | string) {
	return {
		is: value,
		then: (schema: yup.AnySchema) => urlSchema.required(),
		otherwise: (schema: yup.AnySchema) => schema.nullable().optional(),
	};
}

export function thenNull(value: boolean | string) {
	return {
		is: value,
		then: (schema: yup.AnySchema) => schema.nullable().optional(),
		otherwise: (schema: yup.AnySchema) => schema.required(),
	};
}

export const nullOrReq = {
	is: (v: string | boolean | number) => v == true,
	then: (s: yup.AnySchema) => s.nullable(),
	otherwise: (s: yup.AnySchema) => s.required(),
};
