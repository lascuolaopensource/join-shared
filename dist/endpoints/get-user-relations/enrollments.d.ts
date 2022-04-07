import { Enrollment, Course } from "../../types";
export declare type GetUserRelationsEnrollmentsRes = {
    enrollments: Array<Omit<Enrollment, "course"> & {
        course: Course;
    }>;
};
