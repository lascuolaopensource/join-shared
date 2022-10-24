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
 * Collects useful payment data to display to the user
 */
export interface PaymentDetails {
    category: string;
    title: string;
    price: number;
    paid: boolean;
    expiration: string;
    expired: boolean;
    owner: string;
}
