import { Course as ICourse } from "$types";
import { Evaluation } from "$routes";

export namespace Course {
	export function getSchemaCtx(c: ICourse): Evaluation.ISchemaCtx {
		return {
			cvNeeded: c.cvNeeded,
			letterNeeded: c.motivationalLetterNeeded,
			portfolioNeeded: c.portfolioNeeded,
		};
	}
}
