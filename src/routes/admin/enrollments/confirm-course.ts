import { HTTPMethod } from "$types";

//

export namespace ConfirmCourse {
	export const path = (id: string = ":id") =>
		`/admin-enrollments/confirm-course/${id}`;

	export const method = HTTPMethod.GET;

	export interface Req {}

	export interface Res {}
}
