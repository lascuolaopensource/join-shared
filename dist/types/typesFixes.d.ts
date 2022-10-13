/**
 * Adds ID to any interface
 */
export declare type ID<T> = T & {
    id: string;
};
/**
 * Cleans a component from __typeName and ID
 */
export declare type CleanComp<T> = Omit<T, "id" | "__typename">;
