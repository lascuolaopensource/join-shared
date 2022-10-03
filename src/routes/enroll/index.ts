import * as yup from "yup";
import { Schemas } from "../../validation";
import { HTTPMethod } from "../../types";

export namespace Enroll {
	export const path = "/enroll";
	export const method = HTTPMethod.POST;

	// import * as yup from "yup";
	// import {
	//     thenReq,
	//     thenUrlReq,
	//     phoneSchema,
	//     setYupDefaultMessages,
	// } from "../validation";

	// setYupDefaultMessages();

	// export type Contacts = typeof ContactsValues;

	// export type Evaluation = typeof EvaluationValues;

	// /**
	//  * Enroll
	//  */

	// export const EnrollValues = {
	//     courseId: "",
	//     contacts: ContactsValues,
	//     evaluation: EvaluationValues,
	// };

	// export const EnrollSchema = yup.object({
	//     courseId: yup.string().required(),
	//     contacts: ContactsSchema,
	//     evaluation: EvaluationSchema,
	// });

	// export type EnrollReq = {
	//     courseId: string;
	//     contacts: Contacts;
	//     evaluation: Evaluation;
	// };

	// export type EnrollRes = {
	//     paymentId: string | null;
	// };

	// 	export interface Req {
	// 		email: string;
	// 	}

	// 	export const values: Req = {
	// 		email: "",
	// 	};

	// 	export const schema = yup
	// 		.object({
	// 			email: Schemas.email.required(),
	// 		})
	// 		.required();

	// 	export interface Res {
	// 		ok: boolean;
	// 		// Also, there's a redirection
	// 		// The url has a code needed for the reset
	// 	}
}

/**
 * Contacts
 */

export const ContactsValues = {
	email: "",
	name: "",
	surname: "",
	phone: "",
};

export interface ContactsSchemaCtx {
	userExists: boolean;
}

const USER_EXISTS = "$userExists";
export const ContactsSchema = yup.object({
	email: yup.string().email().when(USER_EXISTS, Schemas.thenReq(false)),
	name: yup.string().when(USER_EXISTS, Schemas.thenReq(false)),
	surname: yup.string().when(USER_EXISTS, Schemas.thenReq(false)),
	phone: Schemas.phone.required(),
});

/**
 * Evaluation
 */

export const EvaluationValues = {
	letter: "",
	portfolio: "",
	cv: "",
};

export interface EvaluationSchemaCtx {
	letterNeeded: boolean;
	portfolioNeeded: boolean;
	cvNeeded: boolean;
}

export const EvaluationSchema = yup.object({
	letter: yup.string().when("$letterNeeded", Schemas.thenReq(true)),
	portfolio: yup.string().when("$portfolioNeeded", Schemas.thenUrlReq(true)),
	cv: yup.string().when("$cvNeeded", Schemas.thenUrlReq(true)),
});
