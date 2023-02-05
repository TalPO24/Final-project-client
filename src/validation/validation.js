import Joi from "joi-browser";

//* This function uses the Joi library to validate an object based on a provided validation schema.
const validate = (objToValidate, schema) => {
    return Joi.validate(objToValidate, schema, { abortEarly: false });
};

export default validate;