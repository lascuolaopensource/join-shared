import * as yup from "yup";
import { emailSchema, setYupDefaultMessages } from "../validators";

setYupDefaultMessages();

/**
 * LoginEmail
 */

export type LoginEmailReq = {
	email: string;
};

export type LoginEmailRes = {
	email: string;
	name: string;
};

export const LoginEmailValues = {
	email: "",
};

export const LoginEmailSchema = yup.object({
	email: emailSchema.required(),
});

export const enum LoginEmailErrors {
	notFound = "leNotFound",
	badRequest = "leBadRequest",
}
