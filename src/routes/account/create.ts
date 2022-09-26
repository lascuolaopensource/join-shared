import * as yup from "yup";
import { Schemas } from "../../validation";

export namespace Create {
	export interface Req {
		name: string;
		surname: string;
		email: string;
		password: string;
	}

	export const values: Req = {
		name: "",
		surname: "",
		email: "",
		password: "",
	};

	export const schema = yup
		.object({
			name: yup.string().required(),
			surname: yup.string().required(),
			email: Schemas.email.required(),
			password: yup.string().required(),
		})
		.required();

	export interface Res {}
}
