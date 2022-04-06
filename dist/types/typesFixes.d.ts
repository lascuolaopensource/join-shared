import { UsersPermissionsMe, ComponentLocationAddress, BillingInfoDataDynamicZone, Payment } from "./types";
/**
 * Utility
 */
export declare type ID<T> = T & {
    id: string;
};
export declare type Comp<T> = Partial<T> & {
    __component: string;
};
/**
 * Login
 */
export interface LoginResponse {
    jwt?: string;
    user: UsersPermissionsMe;
}
/**
 * Payment
 */
export interface PaymentC extends Payment {
    confirmCode: string;
}
export interface PaymentDetails {
    category: string;
    title: string;
    price: number;
    paid: boolean;
    expiration: string;
    expired: boolean;
    owner: string;
}
export interface PaymentBillingInfo {
    address: ComponentLocationAddress;
    data: Comp<BillingInfoDataDynamicZone>;
}
export declare enum PaymentCategories {
    course = "course"
}
/**
 * Billing options
 */
export declare const BillingOptions: readonly ["me", "person", "company"];
export declare type BillingOptions = typeof BillingOptions[number];
export declare enum BillingOptionsComponents {
    Company = "billing.company",
    Person = "billing.person",
    Me = "billing.me"
}
/**
 * Roles
 */
export declare enum UserPermissionRoles {
    Public = "public",
    Authenticated = "authenticated",
    AdminEnrollments = "admin_enrollments"
}
