const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 55
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  age: {
    type: Number,
    required: true
  },
  isAdmin: Boolean,
  default:false,
});

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(12).required(),
  age: Joi.number().required()
})
const joilogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(12).required()
})
const User = mongoose.model("user", userSchema);

const validateUser = (requestBody) => {
  return joiSchema.validate(requestBody)
}
const validateUserlogin = (requestBody) => {
  return joilogin.validate(requestBody)
}

module.exports = { User, validateUser, validateUserlogin};
