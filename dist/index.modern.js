import * as yup from 'yup';

var Regex;

(function (Regex) {
  // Fiscal codes
  Regex.vat = /^[0-9]{11}$/;
  Regex.sdi = /^([0-9]|[A-Z]){6,7}$/;
  Regex.cf = /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/; // Location

  Regex.provincia = /^[A-Z]{2}$/;
  Regex.cap = /^[0-9]{5}$/; // Contacts

  Regex.pec = /^(.*)@(?:\w*\.)*pec(?:\.\w+)+$/;
  Regex.phone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  Regex.url = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
})(Regex || (Regex = {}));

var Schemas;

(function (Schemas) {
  /**
   * Basic schemas
   */
  Schemas.url = yup.string().lowercase().matches(Regex.url);
  Schemas.cf = yup.string().uppercase().matches(Regex.cf);
  Schemas.vat = yup.string().matches(Regex.vat);
  Schemas.sdi = yup.string().uppercase().matches(Regex.sdi);
  Schemas.phone = yup.string().matches(Regex.phone);
  Schemas.email = yup.string().email();
  Schemas.pec = Schemas.email.matches(Regex.pec);
  Schemas.provincia = yup.string().uppercase().matches(Regex.provincia);
  Schemas.cap = yup.string().matches(Regex.cap);
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

  Schemas.thenReq = thenReq;

  function thenUrlReq(value) {
    return {
      is: value,
      then: schema => Schemas.url.required(),
      otherwise: schema => schema.nullable().optional()
    };
  }

  Schemas.thenUrlReq = thenUrlReq;

  function thenNull(value) {
    return {
      is: value,
      then: schema => schema.nullable().optional(),
      otherwise: schema => schema.required()
    };
  }

  Schemas.thenNull = thenNull;
  Schemas.nullOrReq = {
    is: v => v == true,
    then: s => s.nullable(),
    otherwise: s => s.required()
  };
})(Schemas || (Schemas = {}));

var index$4 = {
	__proto__: null,
	get Regex () { return Regex; },
	get Schemas () { return Schemas; }
};

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

var HTTPMethod;

(function (HTTPMethod) {
  HTTPMethod["CONNECT"] = "CONNECT";
  HTTPMethod["DELETE"] = "DELETE";
  HTTPMethod["GET"] = "GET";
  HTTPMethod["HEAD"] = "HEAD";
  HTTPMethod["OPTIONS"] = "OPTIONS";
  HTTPMethod["PATCH"] = "PATCH";
  HTTPMethod["POST"] = "POST";
  HTTPMethod["PUT"] = "PUT";
  HTTPMethod["TRACE"] = "TRACE";
})(HTTPMethod || (HTTPMethod = {}));

var index$3 = {
	__proto__: null,
	get HTTPMethod () { return HTTPMethod; },
	get Enum_Enrollment_State () { return Enum_Enrollment_State; },
	get PublicationState () { return PublicationState; }
};

var Create;

(function (Create) {
  Create.path = "/account/create";
  Create.method = HTTPMethod.POST;
  Create.values = {
    name: "",
    surname: "",
    email: "",
    password: ""
  };
  Create.schema = yup.object({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: Schemas.email.required(),
    password: yup.string().required()
  }).required();
})(Create || (Create = {}));

var UserExists;

(function (UserExists) {
  UserExists.path = "/account/user-exists";
  UserExists.method = HTTPMethod.POST;
  UserExists.values = {
    email: ""
  };
  UserExists.schema = yup.object({
    email: Schemas.email.required()
  }).required();
})(UserExists || (UserExists = {}));

var Login;

(function (Login) {
  Login.path = "/auth/local";
  Login.method = HTTPMethod.POST;
  Login.values = {
    identifier: "",
    password: ""
  };
  Login.schema = yup.object({
    identifier: Schemas.email.required(),
    password: yup.string().required()
  }).required();
})(Login || (Login = {}));

var Forgot;

(function (Forgot) {
  Forgot.path = "/auth/forgot-password";
  Forgot.method = HTTPMethod.POST;
  Forgot.values = {
    email: ""
  };
  Forgot.schema = yup.object({
    email: Schemas.email.required()
  }).required();
})(Forgot || (Forgot = {}));

var Reset;

(function (Reset) {
  Reset.path = "/auth/reset-password";
  Reset.method = HTTPMethod.POST;
  Reset.values = {
    password: "string",
    passwordConfirmation: "string",
    code: "string"
  };
  Reset.schema = yup.object({
    password: yup.string().required(),
    passwordConfirmation: yup.string().required(),
    code: yup.string().required()
  }).required();
})(Reset || (Reset = {}));

var index$2 = {
	__proto__: null,
	get Forgot () { return Forgot; },
	get Reset () { return Reset; }
};

var index$1 = {
	__proto__: null,
	Password: index$2,
	get Create () { return Create; },
	get UserExists () { return UserExists; },
	get Login () { return Login; }
};

var index = {
	__proto__: null,
	Account: index$1
};

const errors = {
  policies: {
    noSchemaInConfig: "noSchemaInConfig",
    bodyNotValid: "bodyNotValid"
  } // AlreadyEnrolled: "AlreadyEnrolled",
  // BadPolicyConfig: "BadPolicyConfig",
  // DefaultRoleNotFound: "DefaultRoleNotFound",
  // EmailSendError: "EmailSendError",
  // EmailTaken: "EmailTaken",
  // EnrollmentExpired: "EnrollmentExpired",
  // InternalServerError: "InternalServerError",
  // InvalidRequestBody: "InvalidRequestBody",
  // InvalidRole: "InvalidRole",
  // MissingCourseID: "MissingCourseID",
  // MissingUserInfo: "MissingUserInfo",
  // NoSchemaProvidedInPolicyConfig: "NoSchemaProvidedInPolicyConfig",
  // NotFound: "NotFound",
  // PasswordThreeDollars: "PasswordThreeDollars",
  // PaymentAlreadyConfirmed: "PaymentAlreadyConfirmed",
  // PaymentAlreadyPaid: "PaymentAlreadyPaid",
  // PaymentExpired: "PaymentExpired",
  // PaymentNotFound: "PaymentNotFound",
  // RegisterDisabled: "RegisterDisabled",
  // UnknownError: "UnknownError",
  // UserExists: "UserExists",
  // UserNotConfirmed: "UserNotConfirmed",
  // UserNotFound: "UserNotFound",
  // ValidationError: "ValidationError",

};

export { errors, index as routes, index$3 as types, index$4 as validation };
//# sourceMappingURL=index.modern.js.map
