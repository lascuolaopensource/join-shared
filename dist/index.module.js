import * as yup from 'yup';
import { gql } from 'graphql-tag';

/**
 * Setting yup default messages
 */

function setYupDefaultMessages() {
  yup.setLocale({
    string: {
      matches: "Il campo non \xE8 valido"
    }
  });
}
setYupDefaultMessages();
/**
 * Regex checks
 */

var re = {
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

var urlSchema = yup.string().lowercase().matches(re.url);
var cfSchema = yup.string().uppercase().matches(re.cf);
var vatSchema = yup.string().matches(re.vat);
var sdiSchema = yup.string().uppercase().matches(re.sdi);
var phoneSchema = yup.string().matches(re.phone);
var emailSchema = yup.string().email();
var pecSchema = emailSchema.matches(re.pec);
var provinciaSchema = yup.string().uppercase().matches(re.provincia);
var capSchema = yup.string().matches(re.cap);
/**
 * Yup dynamic checks
 */

function thenReq(value) {
  return {
    is: value,
    then: function then(schema) {
      return schema.required();
    },
    otherwise: function otherwise(schema) {
      return schema.nullable().optional();
    }
  };
}
function thenUrlReq(value) {
  return {
    is: value,
    then: function then(schema) {
      return urlSchema.required();
    },
    otherwise: function otherwise(schema) {
      return schema.nullable().optional();
    }
  };
}
function thenNull(value) {
  return {
    is: value,
    then: function then(schema) {
      return schema.nullable().optional();
    },
    otherwise: function otherwise(schema) {
      return schema.required();
    }
  };
}
var nullOrReq = {
  is: function is(v) {
    return v == true;
  },
  then: function then(s) {
    return s.nullable();
  },
  otherwise: function otherwise(s) {
    return s.required();
  }
};

var index$4 = {
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

var ContactsValues = {
  exists: false,
  email: "",
  name: "",
  surname: "",
  phone: ""
};
var ContactsSchema = yup.object({
  exists: yup["boolean"]().required(),
  email: yup.string().email().when("exists", thenReq(false)),
  name: yup.string().required().when("exists", thenReq(false)),
  surname: yup.string().required().when("exists", thenReq(false)),
  phone: phoneSchema.required()
});
/**
 * Evaluation
 */

var EvaluationValues = {
  letterNeeded: true,
  letter: "",
  portfolioNeeded: true,
  portfolio: "",
  cvNeeded: true,
  cv: ""
};
var EvaluationSchema = yup.object({
  letterNeeded: yup["boolean"]().required(),
  letter: yup.string().when("letterNeeded", thenReq(true)),
  portfolioNeeded: yup["boolean"]().required(),
  portfolio: yup.string().when("portfolioNeeded", thenUrlReq(true)),
  cvNeeded: yup["boolean"]().required(),
  cv: yup.string().when("cvNeeded", thenUrlReq(true))
});
/**
 * Enroll
 */

var EnrollValues = {
  courseId: "",
  contacts: ContactsValues,
  evaluation: EvaluationValues
};
var EnrollSchema = yup.object({
  courseId: yup.string().required(),
  contacts: ContactsSchema,
  evaluation: EvaluationSchema
});

setYupDefaultMessages();
var LoginEmailValues = {
  email: ""
};
var LoginEmailSchema = yup.object({
  email: emailSchema.required()
});

setYupDefaultMessages();
/**
 * Login
 */

var LoginValues = {
  identifier: "",
  password: ""
};
var LoginSchema = yup.object({
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


var BillingOptions = ["me", "person", "company"]; // Lista dei componenti per la zona dinamica
// Reference: strapi-backend/src/api/billing-info/content-types/billing-info/schema.json

var BillingOptionsComponents;

(function (BillingOptionsComponents) {
  BillingOptionsComponents["Company"] = "billing.company";
  BillingOptionsComponents["Person"] = "billing.person";
  BillingOptionsComponents["Me"] = "billing.me";
})(BillingOptionsComponents || (BillingOptionsComponents = {}));

var index$3 = {
	__proto__: null,
	get Enum_Enrollment_State () { return Enum_Enrollment_State; },
	get PublicationState () { return PublicationState; },
	get PaymentCategories () { return PaymentCategories; },
	BillingOptions: BillingOptions,
	get BillingOptionsComponents () { return BillingOptionsComponents; }
};

setYupDefaultMessages();
/**
 * Address
 */

var AddressValues = {
  cap: "",
  town: "",
  street: "",
  province: ""
};
var AddressSchema = yup.object({
  cap: capSchema.required(),
  town: yup.string().required(),
  province: provinciaSchema.required(),
  street: yup.string().required()
});
/**
 * Billing data
 */
// Me

var BillingMeValues = {
  cf: "",
  address: AddressValues
};
var BillingMeSchema = yup.object({
  cf: cfSchema.required(),
  address: AddressSchema.required()
}); // Person

var BillingPersonValues = {
  name: "",
  surname: "",
  cf: "",
  email: "",
  address: AddressValues
};
var BillingPersonSchema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  cf: cfSchema.required(),
  email: emailSchema.required(),
  address: AddressSchema.required()
}); // Company

var BillingCompanyValues = {
  name: "",
  vat: "",
  sdi: "",
  pec: "",
  address: AddressValues
};
var BillingCompanySchema = yup.object({
  name: yup.string().required(),
  vat: vatSchema.required(),
  sdi: sdiSchema,
  pec: pecSchema.required(),
  address: AddressSchema
});
var PayValues = {
  billingOption: null,
  me: BillingMeValues,
  person: BillingPersonValues,
  company: BillingCompanyValues
};
var PaySchema = yup.object({
  //
  billingOption: yup.string().oneOf([].concat(BillingOptions)).required(),
  //
  me: yup.object().when("billingOption", {
    is: BillingOptions[0],
    then: function then(schema) {
      return BillingMeSchema.required();
    },
    otherwise: function otherwise(schema) {
      return schema;
    }
  }),
  person: yup.object().when("billingOption", {
    is: BillingOptions[1],
    then: function then(schema) {
      return BillingPersonSchema.required();
    },
    otherwise: function otherwise(schema) {
      return schema;
    }
  }),
  company: yup.object().when("billingOption", {
    is: BillingOptions[2],
    then: function then(schema) {
      return BillingCompanySchema.required();
    },
    otherwise: function otherwise(schema) {
      return schema;
    }
  })
});

setYupDefaultMessages();
var UserExistsSchema = yup.object({
  email: emailSchema.required()
});

var index$2 = {
	__proto__: null,
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
	UserExistsSchema: UserExistsSchema
};

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var _templateObject;
var getCoursePageBySlug = gql(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n\tquery getCoursePageBySlug($slug: String!) {\n\t\tcourses(filters: { slug: { eq: $slug } }) {\n\t\t\tdata {\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t\tslug\n\t\t\t\t\tmeetings {\n\t\t\t\t\t\tdate\n\t\t\t\t\t\ttimeSlots {\n\t\t\t\t\t\t\tstartTime\n\t\t\t\t\t\t\tendTime\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"]))); // export const getCourseEnrollmentBySlug = gql`
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

function isPaymentNeeded(c) {
  return c.price > 0;
}
function isEvaluationNeeded(c) {
  return c.cvNeeded || c.motivationalLetterNeeded || c.portfolioNeeded;
}
function isEnrollable(c) {
  return Date.now() < Date.parse(c.enrollmentDeadline);
}

var course = {
	__proto__: null,
	isPaymentNeeded: isPaymentNeeded,
	isEvaluationNeeded: isEvaluationNeeded,
	isEnrollable: isEnrollable
};

function isExpired(p) {
  return Date.now() > Date.parse(p.expiration);
}

var payment = {
	__proto__: null,
	isExpired: isExpired
};

var index = {
	__proto__: null,
	course: course,
	payment: payment
};

var Errors;

(function (Errors) {
  Errors["DefaultRoleNotFound"] = "DefaultRoleNotFound";
  Errors["EmailSendError"] = "EmailSendError";
  Errors["EmailTaken"] = "EmailTaken";
  Errors["NotFound"] = "NotFound";
  Errors["PasswordThreeDollars"] = "PasswordThreeDollars";
  Errors["PaymentAlreadyPaid"] = "PaymentAlreadyPaid";
  Errors["PaymentExpired"] = "PaymentExpired";
  Errors["PaymentNotFound"] = "PaymentNotFound";
  Errors["RegisterDisabled"] = "RegisterDisabled";
  Errors["UnknownError"] = "UnknownError";
  Errors["UserNotConfirmed"] = "UserNotConfirmed";
  Errors["ValidationError"] = "ValidationError";
  Errors["UserExists"] = "UserExists";
  Errors["EnrollmentExpired"] = "EnrollmentExpired";
  Errors["AlreadyEnrolled"] = "AlreadyEnrolled";
  Errors["NoSchemaProvidedInPolicyConfig"] = "NoSchemaProvidedInPolicyConfig";
})(Errors || (Errors = {}));

export { Errors, index$2 as e, index$1 as gql, index as h, index$3 as t, index$4 as validators };
//# sourceMappingURL=index.module.js.map
