import { Payment } from "./types";
/**
 * Adds ID to any interface
 */
export declare type ID<T> = T & {
    id: string;
};
/**
 * Cleans a component interface from keys: __typename and ID
 */
export declare type CleanComp<T> = Omit<T, "id" | "__typename">;
/**
 * Adds confirmation code to Payment keys
 */
export interface PaymentC extends Payment {
    confirmationCode: string;
}
/**
 * Collects useful payment data to display to the user
 */
export interface PaymentDetails {
    category: string;
    title: string;
    price: number;
    executed: boolean;
    deadline: string;
    expired: boolean;
    owner: string;
}
export declare enum PaymentCategories {
    course = "course"
}
