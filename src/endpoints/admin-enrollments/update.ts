import { Enrollment } from "../../types";
import * as yup from "yup";

export type AdminEnrollmentsUpdateReq = Record<string, Enrollment>;

export const AdminEnrollmentsUpdateSchema = yup
	.object()
	.required()
	.test(
		"has-state",
		"Some objects do not have a state attribute",
		(value: AdminEnrollmentsUpdateReq) => {
			for (let e of Object.values(value)) {
				if (!e.state) {
					return false;
				}
			}
			return true;
		}
	);
