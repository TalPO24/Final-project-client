import Joi from "joi-browser";

//* This function ("registerSchema") uses the Joi library to define validation rules for name, email and password input fields for register.
const registerSchema = {
    name: Joi.string().min(2).max(35).required().label("Name"),
    email: Joi.string().email().min(6).max(35).required().label("Email"),
    password: Joi.string().min(6).max(15).required().label("Password"),
};

export default registerSchema;