import { Course } from "../types";
export declare function isPaymentNeeded(c: Course): boolean;
export declare function isEvaluationNeeded(c: Course): boolean;
export declare function isEnrollable(c: Course): boolean;
export declare function getStartDate(c: Course): string;
export declare function getEndDate(c: Course): string;
