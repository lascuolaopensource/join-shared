import { HTTPMethod } from "$types";
export declare namespace Confirm {
    const path = "/pay/confirm";
    const method = HTTPMethod.POST;
    interface Req {
        confirmationCode: string;
    }
    interface Res {
        confirmed: boolean;
    }
}
