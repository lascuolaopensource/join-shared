import { Course as ICourse } from "$types";
import { Evaluation } from "$routes";
export declare namespace Course {
    function getSchemaCtx(c: ICourse): Evaluation.ISchemaCtx;
}
