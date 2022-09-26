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
      then: function then(schema) {
        return schema.required();
      },
      otherwise: function otherwise(schema) {
        return schema.nullable().optional();
      }
    };
  }

  Schemas.thenReq = thenReq;

  function thenUrlReq(value) {
    return {
      is: value,
      then: function then(schema) {
        return Schemas.url.required();
      },
      otherwise: function otherwise(schema) {
        return schema.nullable().optional();
      }
    };
  }

  Schemas.thenUrlReq = thenUrlReq;

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

  Schemas.thenNull = thenNull;
  Schemas.nullOrReq = {
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
})(Schemas || (Schemas = {}));

var index$2 = {
	__proto__: null,
	get Regex () { return Regex; },
	get Schemas () { return Schemas; }
};

var Create;

(function (Create) {
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

var index$1 = {
	__proto__: null,
	get Create () { return Create; }
};

var index = {
	__proto__: null,
	Account: index$1
};

var errors = {
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

export { errors, index as routes, index$2 as validation };
//# sourceMappingURL=index.module.js.map
