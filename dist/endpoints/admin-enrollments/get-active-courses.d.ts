import { Enrollment, Course, ID } from "../../types";
export declare type AdminEnrollmentsGetUpcomingCoursesRes = {
    courses: Array<Omit<Course, "enrollments"> & {
        enrollments: Array<ID<Enrollment>>;
    }>;
};
