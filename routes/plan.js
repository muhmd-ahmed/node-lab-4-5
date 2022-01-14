const express = require("express");
const { Plan, validatePlan } = require("../model/plan");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  const plans = await Plan.find().populate("users", "name email -_id");
  res.json(plans);
});

router.get("/:id", async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })
  const plan = await Plan.findById(req.params.id);
  if (!plan) return res.status(404).json({ message: "no plan with the given id" })
  res.json(plan);
});

router.post("/", async (req, res) => {
  const { error } = validatePlan(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const newPlan = new Plan(req.body);
    const result = await newPlan.save();
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })
  const plan = await Plan.findById(req.params.id);
  plan.name = req.body.name;
  plan.price = req.body.price;
  await plan.save();
  res.json(plan);
});

router.delete("/:id", async (req, res) => {
  const result = await Plan.findByIdAndDelete(req.params.id);
  res.json(result);
});

module.exports = router;
