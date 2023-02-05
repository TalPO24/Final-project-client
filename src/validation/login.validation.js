import Joi from "joi-browser";

//* This function ("loginSchema") uses the Joi library to define validation rules for an email and password input fields for login.
const loginSchema = {
    email: Joi.string().email().min(6).max(35).required().label("Email"),
    password: Joi.string().min(6).max(15).required().label("Password"),
};

export default loginSchema;