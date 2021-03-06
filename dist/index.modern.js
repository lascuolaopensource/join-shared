import * as yup from 'yup';
import { gql } from 'graphql-tag';

const AdminEnrollmentsUpdateSchema = yup.object().required();

/**
 * Setting yup default messages
 */

function setYupDefaultMessages() {
  yup.setLocale({
    string: {
      matches: `Il campo non è valido`
    }
  });
}
setYupDefaultMessages();
/**
 * Regex checks
 */

const re = {
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  cf: /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/,
  phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  provincia: /^[A-Z]{2}$/,
  cap: /^[0-9]{5}$/,
  vat: /^[0-9]{11}$/,
  sdi: /^([0-9]|[A-Z]){6,7}$/,
  pec: /^(.*)@(?:\w*\.)*pec(?:\.\w+)+$/
};
/**
 * Schemas
 */

const urlSchema = yup.string().lowercase().matches(re.url);
const cfSchema = yup.string().uppercase().matches(re.cf);
const vatSchema = yup.string().matches(re.vat);
const sdiSchema = yup.string().uppercase().matches(re.sdi);
const phoneSchema = yup.string().matches(re.phone);
const emailSchema = yup.string().email();
const pecSchema = emailSchema.matches(re.pec);
const provinciaSchema = yup.string().uppercase().matches(re.provincia);
const capSchema = yup.string().matches(re.cap);
/**
 * Yup dynamic checks
 */

function thenReq(value) {
  return {
    is: value,
    then: schema => schema.required(),
    otherwise: schema => schema.nullable().optional()
  };
}
function thenUrlReq(value) {
  return {
    is: value,
    then: schema => urlSchema.required(),
    otherwise: schema => schema.nullable().optional()
  };
}
function thenNull(value) {
  return {
    is: value,
    then: schema => schema.nullable().optional(),
    otherwise: schema => schema.required()
  };
}
const nullOrReq = {
  is: v => v == true,
  then: s => s.nullable(),
  otherwise: s => s.required()
};

var index$5 = {
	__proto__: null,
	setYupDefaultMessages: setYupDefaultMessages,
	re: re,
	urlSchema: urlSchema,
	cfSchema: cfSchema,
	vatSchema: vatSchema,
	sdiSchema: sdiSchema,
	phoneSchema: phoneSchema,
	emailSchema: emailSchema,
	pecSchema: pecSchema,
	provinciaSchema: provinciaSchema,
	capSchema: capSchema,
	thenReq: thenReq,
	thenUrlReq: thenUrlReq,
	thenNull: thenNull,
	nullOrReq: nullOrReq
};

setYupDefaultMessages();
/**
 * Contacts
 */

const ContactsValues = {
  exists: false,
  email: "",
  name: "",
  surname: "",
  phone: ""
};
const ContactsSchema = yup.object({
  exists: yup.boolean().required(),
  email: yup.string().email().when("exists", thenReq(false)),
  name: yup.string().required().when("exists", thenReq(false)),
  surname: yup.string().required().when("exists", thenReq(false)),
  phone: phoneSchema.required()
});
/**
 * Evaluation
 */

const EvaluationValues = {
  letterNeeded: true,
  letter: "",
  portfolioNeeded: true,
  portfolio: "",
  cvNeeded: true,
  cv: ""
};
const EvaluationSchema = yup.object({
  letterNeeded: yup.boolean().required(),
  letter: yup.string().when("letterNeeded", thenReq(true)),
  portfolioNeeded: yup.boolean().required(),
  portfolio: yup.string().when("portfolioNeeded", thenUrlReq(true)),
  cvNeeded: yup.boolean().required(),
  cv: yup.string().when("cvNeeded", thenUrlReq(true))
});
/**
 * Enroll
 */

const EnrollValues = {
  courseId: "",
  contacts: ContactsValues,
  evaluation: EvaluationValues
};
const EnrollSchema = yup.object({
  courseId: yup.string().required(),
  contacts: ContactsSchema,
  evaluation: EvaluationSchema
});

setYupDefaultMessages();
const LoginEmailValues = {
  email: ""
};
const LoginEmailSchema = yup.object({
  email: emailSchema.required()
});

setYupDefaultMessages();
/**
 * Login
 */

const LoginValues = {
  identifier: "",
  password: ""
};
const LoginSchema = yup.object({
  identifier: emailSchema.required(),
  password: yup.string().required()
});

var Enum_Enrollment_State;

(function (Enum_Enrollment_State) {
  Enum_Enrollment_State["Approved"] = "approved";
  Enum_Enrollment_State["AwaitingPayment"] = "awaitingPayment";
  Enum_Enrollment_State["Pending"] = "pending";
  Enum_Enrollment_State["Rejected"] = "rejected";
})(Enum_Enrollment_State || (Enum_Enrollment_State = {}));

var Enum_Toolslot_Type;

(function (Enum_Toolslot_Type) {
  Enum_Toolslot_Type["Availability"] = "availability";
  Enum_Toolslot_Type["Booking"] = "booking";
})(Enum_Toolslot_Type || (Enum_Toolslot_Type = {}));

var PublicationState;

(function (PublicationState) {
  PublicationState["Live"] = "LIVE";
  PublicationState["Preview"] = "PREVIEW";
})(PublicationState || (PublicationState = {}));

var PaymentCategories;

(function (PaymentCategories) {
  PaymentCategories["course"] = "course";
})(PaymentCategories || (PaymentCategories = {}));
/**
 * Billing options
 */


const BillingOptions = ["me", "person", "company"]; // Lista dei componenti per la zona dinamica
// Reference: strapi-backend/src/api/billing-info/content-types/billing-info/schema.json

var BillingOptionsComponents;

(function (BillingOptionsComponents) {
  BillingOptionsComponents["Company"] = "billing.company";
  BillingOptionsComponents["Person"] = "billing.person";
  BillingOptionsComponents["Me"] = "billing.me";
})(BillingOptionsComponents || (BillingOptionsComponents = {}));
/**
 * Roles
 */


var UserPermissionRoles;

(function (UserPermissionRoles) {
  UserPermissionRoles["Public"] = "public";
  UserPermissionRoles["Authenticated"] = "authenticated";
  UserPermissionRoles["AdminEnrollments"] = "admin_enrollments";
  UserPermissionRoles["AdminTools"] = "admin_tools";
})(UserPermissionRoles || (UserPermissionRoles = {}));

var index$4 = {
	__proto__: null,
	get Enum_Enrollment_State () { return Enum_Enrollment_State; },
	get Enum_Toolslot_Type () { return Enum_Toolslot_Type; },
	get PublicationState () { return PublicationState; },
	get PaymentCategories () { return PaymentCategories; },
	BillingOptions: BillingOptions,
	get BillingOptionsComponents () { return BillingOptionsComponents; },
	get UserPermissionRoles () { return UserPermissionRoles; }
};

setYupDefaultMessages();
/**
 * Address
 */

const AddressValues = {
  cap: "",
  town: "",
  street: "",
  province: ""
};
const AddressSchema = yup.object({
  cap: capSchema.required(),
  town: yup.string().required(),
  province: provinciaSchema.required(),
  street: yup.string().required()
});
/**
 * Billing data
 */
// Me

const BillingMeValues = {
  cf: "",
  address: AddressValues
};
const BillingMeSchema = yup.object({
  cf: cfSchema.required(),
  address: AddressSchema.required()
}); // Person

const BillingPersonValues = {
  name: "",
  surname: "",
  cf: "",
  email: "",
  address: AddressValues
};
const BillingPersonSchema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  cf: cfSchema.required(),
  email: emailSchema.required(),
  address: AddressSchema.required()
}); // Company

const BillingCompanyValues = {
  name: "",
  vat: "",
  sdi: "",
  pec: "",
  address: AddressValues
};
const BillingCompanySchema = yup.object({
  name: yup.string().required(),
  vat: vatSchema.required(),
  sdi: sdiSchema,
  pec: pecSchema.required(),
  address: AddressSchema
});
const PayValues = {
  billingOption: null,
  me: BillingMeValues,
  person: BillingPersonValues,
  company: BillingCompanyValues
};
const PaySchema = yup.object({
  //
  billingOption: yup.string().oneOf([...BillingOptions]).required(),
  //
  me: yup.object().when("billingOption", {
    is: BillingOptions[0],
    then: schema => BillingMeSchema.required(),
    otherwise: schema => schema
  }),
  person: yup.object().when("billingOption", {
    is: BillingOptions[1],
    then: schema => BillingPersonSchema.required(),
    otherwise: schema => schema
  }),
  company: yup.object().when("billingOption", {
    is: BillingOptions[2],
    then: schema => BillingCompanySchema.required(),
    otherwise: schema => schema
  })
});

setYupDefaultMessages();
const UserExistsSchema = yup.object({
  email: emailSchema.required()
});

var DayResKind;

(function (DayResKind) {
  DayResKind["Single"] = "single";
  DayResKind["Multiple"] = "multiple";
})(DayResKind || (DayResKind = {}));

var index$3 = {
	__proto__: null,
	AdminEnrollmentsUpdateSchema: AdminEnrollmentsUpdateSchema,
	ContactsValues: ContactsValues,
	ContactsSchema: ContactsSchema,
	EvaluationValues: EvaluationValues,
	EvaluationSchema: EvaluationSchema,
	EnrollValues: EnrollValues,
	EnrollSchema: EnrollSchema,
	LoginEmailValues: LoginEmailValues,
	LoginEmailSchema: LoginEmailSchema,
	LoginValues: LoginValues,
	LoginSchema: LoginSchema,
	AddressValues: AddressValues,
	AddressSchema: AddressSchema,
	BillingMeValues: BillingMeValues,
	BillingMeSchema: BillingMeSchema,
	BillingPersonValues: BillingPersonValues,
	BillingPersonSchema: BillingPersonSchema,
	BillingCompanyValues: BillingCompanyValues,
	BillingCompanySchema: BillingCompanySchema,
	PayValues: PayValues,
	PaySchema: PaySchema,
	UserExistsSchema: UserExistsSchema,
	get DayResKind () { return DayResKind; }
};

const formatPriceNumber = (price, locale = "IT-it", currency = "EUR") => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  });
  return formatter.format(price);
};
const formatDateString = (date, locale = "IT-it") => {
  const d = new Date(Date.parse(date));
  return d.toLocaleDateString(locale, {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit"
  });
};

var index$2 = {
	__proto__: null,
	formatPriceNumber: formatPriceNumber,
	formatDateString: formatDateString
};

let _ = t => t,
    _t;
const getCoursePageBySlug = gql(_t || (_t = _`
	query getCoursePageBySlug($slug: String!) {
		courses(filters: { slug: { eq: $slug } }) {
			data {
				attributes {
					title
					description
					slug
					meetings {
						date
						timeSlots {
							startTime
							endTime
						}
					}
				}
			}
		}
	}
`)); // export const getCourseEnrollmentBySlug = gql`
// 	query getCourseEnrollmentBySlug($slug: String!) {
// 		courses(filters: { slug: { eq: $slug } }) {
// 			data {
// 				id
// 				attributes {
// 					title
// 					slug
// 					enrollmentDeadline
// 					motivationalLetterNeeded
// 					cvNeeded
// 					portfolioNeeded
// 					price
// 				}
// 			}
// 		}
// 	}
// `;

var index$1 = {
	__proto__: null,
	getCoursePageBySlug: getCoursePageBySlug
};

function getStartDate(c) {
  return c.meetings[0].date;
}
function getEndDate(c) {
  return c.meetings[c.meetings.length - 1].date;
} // Evaluation flags

function isPaymentNeeded(c) {
  return c.price > 0;
}
function isEvaluationNeeded(c) {
  return c.cvNeeded || c.motivationalLetterNeeded || c.portfolioNeeded;
} // Course times

function isErollmentTime(c) {
  return Date.now() < Date.parse(c.enrollmentDeadline);
}
function isCourseTime(c) {
  return Date.now() >= Date.parse(getStartDate(c));
}
function isEvaluationTime(c) {
  return !isErollmentTime(c) && !isCourseTime(c);
} // Enrollments flags

function areMinEnrollsReached(c, e) {
  return e.length >= c.enrollmentMin;
}
function areMaxEnrollsExceeded(c, e) {
  return e.length > c.enrollmentMax;
}
function countEnrollsApproved(a) {
  return a.filter(e => e.state == Enum_Enrollment_State.Approved).length;
}
function areMinEnrollsApproved(c, e) {
  return countEnrollsApproved(e) >= c.enrollmentMin;
} //

function canStart(c, e) {
  return areMinEnrollsReached(c, e) && isEvaluationTime(c);
}
function cannotStart(c, e) {
  return !areMinEnrollsReached(c, e) && isEvaluationTime(c);
} //

function isActive(c, e) {
  return areMinEnrollsApproved(c, e) && isCourseTime(c);
}
function isNotActivated(c, e) {
  return !areMinEnrollsApproved(c, e) && isCourseTime(c);
}

var course = {
	__proto__: null,
	getStartDate: getStartDate,
	getEndDate: getEndDate,
	isPaymentNeeded: isPaymentNeeded,
	isEvaluationNeeded: isEvaluationNeeded,
	isErollmentTime: isErollmentTime,
	isCourseTime: isCourseTime,
	isEvaluationTime: isEvaluationTime,
	areMinEnrollsReached: areMinEnrollsReached,
	areMaxEnrollsExceeded: areMaxEnrollsExceeded,
	countEnrollsApproved: countEnrollsApproved,
	areMinEnrollsApproved: areMinEnrollsApproved,
	canStart: canStart,
	cannotStart: cannotStart,
	isActive: isActive,
	isNotActivated: isNotActivated
};

function isExpired(p) {
  return Date.now() > Date.parse(p.expiration);
}

var payment = {
	__proto__: null,
	isExpired: isExpired
};

/**
 * Adds days to a date, returning a copy
 * @param d The date
 * @param amount Number of days
 * @returns A copy of the date, updated
 */
function addDays(d, amount) {
  const d_copy = new Date(d.getTime());
  const diff = d.getDate() + amount;
  d_copy.setDate(diff);
  return d_copy;
}
/**
 * Adds hours to a date, returning a copy
 * @param d The date
 * @param amount Number of hours
 * @returns A copy of the date, updated
 */

function addHours(d, amount) {
  const d_copy = new Date(d.getTime());
  const diff = d.getHours() + amount;
  d_copy.setHours(diff);
  return d_copy;
}
/**
 * Adds time (in MS) to a date, returning a copy
 * @param d The date
 * @param amount Time in milliseconds
 * @returns A copy of the date, updated
 */

function addTime(d, amount) {
  const d_copy = new Date(d.getTime() + amount);
  return d_copy;
}
/**
 * Sets date hours, mins, secs, ms, returning a copy
 * @param d The date
 * @param hours Hours
 * @param min Minutes
 * @param sec Seconds
 * @param ms Milliseconds
 * @returns A copy of the date, updated
 */

function setHours(d, hours, min = 0, sec = 0, ms = 0) {
  const d_copy = new Date(d.getTime());
  d_copy.setHours(hours, min, sec, ms);
  return d_copy;
} //

function formatQueryDate(d) {
  return d.toISOString().split("T")[0];
}
function getDateMidnight(d) {
  const db = new Date(d.getTime());
  db.setHours(0, 0, 0, 0);
  return db;
}
function getPreviousMonday(d) {
  const day = d.getDay();
  const diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday

  return new Date(d.setDate(diff));
}
function joinDateHour(d, h) {
  return new Date(Date.parse(`${d}T${h}Z`));
}
function getHHMM(d) {
  const hour = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");
  return `${hour}:${mins}`;
}
function getTimeString(d) {
  return d.toISOString().split("T")[1].replace("Z", "");
}
/**
 * Splits the day in time slots
 * @param ms The length of the slot, in MS
 * @returns An array with all the start times of the slots
 */

function splitDayInSlots(ms) {
  const iterations = Math.round(24 * 60 * 60 * 1000 / ms);
  const slots = [];

  for (let i = 0; i < iterations; i++) {
    slots.push(ms * i);
  }

  return slots;
}
/**
 *
 * @param ms The time in milliseconds
 * @returns The milliseconds of that time
 */

function msToMilliseconds(ms) {
  return Math.floor(ms % 1000 / 100);
}
/**
 *
 * @param ms The time in milliseconds
 * @returns The seconds of that time
 */

function msToSeconds(ms) {
  return Math.floor(ms / 1000 % 60);
}
/**
 *
 * @param ms The time in milliseconds
 * @returns The minutes of that time
 */

function msToMinutes(ms) {
  return Math.floor(ms / (1000 * 60) % 60);
}
/**
 *
 * @param ms The time in milliseconds
 * @returns The hours of that time
 */

function msToHours(ms) {
  return Math.floor(ms / (1000 * 60 * 60) % 24);
}
/**
 *
 * @param ms The time in milliseconds
 * @returns The hours, minutes, seconds of that time
 */

function msToTime(ms) {
  return {
    hours: msToHours(ms),
    minutes: msToMinutes(ms),
    seconds: msToSeconds(ms),
    milliseconds: msToMilliseconds(ms)
  };
}
/**
 *
 * @param ms The time in milliseconds
 * @returns The hours and mins of that time formatted as HH:MM
 */

function msToHHMM(ms) {
  const time = msToTime(ms);
  const hours = String(time.hours).padStart(2, "0");
  const mins = String(time.minutes).padStart(2, "0");
  return `${hours}:${mins}`;
}

var date = {
	__proto__: null,
	addDays: addDays,
	addHours: addHours,
	addTime: addTime,
	setHours: setHours,
	formatQueryDate: formatQueryDate,
	getDateMidnight: getDateMidnight,
	getPreviousMonday: getPreviousMonday,
	joinDateHour: joinDateHour,
	getHHMM: getHHMM,
	getTimeString: getTimeString,
	splitDayInSlots: splitDayInSlots,
	msToMilliseconds: msToMilliseconds,
	msToSeconds: msToSeconds,
	msToMinutes: msToMinutes,
	msToHours: msToHours,
	msToTime: msToTime,
	msToHHMM: msToHHMM
};

var index = {
	__proto__: null,
	course: course,
	payment: payment,
	date: date
};

var Errors;

(function (Errors) {
  Errors["AlreadyEnrolled"] = "AlreadyEnrolled";
  Errors["BadPolicyConfig"] = "BadPolicyConfig";
  Errors["DefaultRoleNotFound"] = "DefaultRoleNotFound";
  Errors["EmailSendError"] = "EmailSendError";
  Errors["EmailTaken"] = "EmailTaken";
  Errors["EnrollmentExpired"] = "EnrollmentExpired";
  Errors["InternalServerError"] = "InternalServerError";
  Errors["InvalidRequestBody"] = "InvalidRequestBody";
  Errors["InvalidRole"] = "InvalidRole";
  Errors["MissingCourseID"] = "MissingCourseID";
  Errors["MissingUserInfo"] = "MissingUserInfo";
  Errors["NoSchemaProvidedInPolicyConfig"] = "NoSchemaProvidedInPolicyConfig";
  Errors["NotFound"] = "NotFound";
  Errors["PasswordThreeDollars"] = "PasswordThreeDollars";
  Errors["PaymentAlreadyConfirmed"] = "PaymentAlreadyConfirmed";
  Errors["PaymentAlreadyPaid"] = "PaymentAlreadyPaid";
  Errors["PaymentExpired"] = "PaymentExpired";
  Errors["PaymentNotFound"] = "PaymentNotFound";
  Errors["RegisterDisabled"] = "RegisterDisabled";
  Errors["UnknownError"] = "UnknownError";
  Errors["UserExists"] = "UserExists";
  Errors["UserNotConfirmed"] = "UserNotConfirmed";
  Errors["UserNotFound"] = "UserNotFound";
  Errors["ValidationError"] = "ValidationError";
})(Errors || (Errors = {}));

export { Errors, index$3 as endpoints, index$2 as formatters, index$1 as gql, index as helpers, index$4 as types, index$5 as validation };
//# sourceMappingURL=index.modern.js.map
