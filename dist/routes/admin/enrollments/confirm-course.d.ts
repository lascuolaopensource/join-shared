import { HTTPMethod } from "$types";
export declare namespace ConfirmCourse {
    const path: (id?: string) => string;
    const method = HTTPMethod.GET;
    interface Params {
        id: string;
    }
    interface Req {
    }
    interface Res {
        message?: string;
    }
}
