const mongoose = require("mongoose");
const Joi = require("joi");
const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true
  },
  users: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});
const joyplan=Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
  })
const Plan = mongoose.model("plan", planSchema);
const validatePlan=(requestBody) => {
    return joyplan.validate(requestBody)
  }
module.exports = { Plan ,validatePlan };
