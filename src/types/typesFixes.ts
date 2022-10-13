/**
 * Adds ID to any interface
 */

export type ID<T> = T & { id: string };

/**
 * Cleans a component from __typeName and ID
 */

export type CleanComp<T> = Omit<T, "id" | "__typename">;

// import {
// 	UsersPermissionsMe,
// 	ComponentLocationAddress,
// 	BillingInfoDataDynamicZone,
// 	Payment,
// } from "./types";

// export type Comp<T> = Partial<T> & { __component: string };

// /**
//  * Login
//  */

// export interface LoginResponse {
// 	jwt?: string;
// 	user: UsersPermissionsMe;
// }

// /**
//  * Payment
//  */

// export interface PaymentC extends Payment {
// 	confirmCode: string;
// }

// export interface PaymentDetails {
// 	category: string;
// 	title: string;
// 	price: number;
// 	paid: boolean;
// 	expiration: string;
// 	expired: boolean;
// 	owner: string;
// }

// export interface PaymentBillingInfo {
// 	address: ComponentLocationAddress;
// 	data: Comp<BillingInfoDataDynamicZone>;
// }

// export enum PaymentCategories {
// 	course = "course",
// }

// /**
//  * Billing options
//  */

// // Lista dei componenti per la zona dinamica
// // Reference: strapi-backend/src/api/billing-info/content-types/billing-info/schema.json
// export enum BillingOptionsComponents {
// 	Company = "billing.company",
// 	Person = "billing.person",
// 	Me = "billing.me",
// }

// /**
//  * Roles
//  */

// export enum UserPermissionRoles {
// 	Public = "public",
// 	Authenticated = "authenticated",
// 	AdminEnrollments = "admin_enrollments",
// 	AdminTools = "admin_tools",
// }
