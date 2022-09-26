export declare namespace Create {
    interface Req {
        name: string;
        surname: string;
        email: string;
        password: string;
    }
    const values: Req;
    const schema: import("yup/lib/object").OptionalObjectSchema<{
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>;
    interface Res {
    }
}
