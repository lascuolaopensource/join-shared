import { Enrollment, Course, ID } from "../../types";

export type AdminEnrollmentsGetActiveCoursesRes = {
	courses: Array<
		Omit<Course, "enrollments"> & { enrollments: Array<ID<Enrollment>> }
	>;
};
