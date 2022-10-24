import { HTTPMethod } from "$types";

export namespace Confirm {
	export const path = "/pay/confirm";
	export const method = HTTPMethod.POST;

	export interface Req {
		confirmationCode: string;
	}

	export interface Res {
		confirmed: boolean;
	}
}
