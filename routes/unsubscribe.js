const express = require("express");
const { Plan } = require("../model/plan");
const mongoose = require("mongoose");
const router = express.Router();

router.delete("/:id", async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })
    const user_idisValid = mongoose.Types.ObjectId.isValid(req.body._id);
    if (!user_idisValid) return res.status(400).json({ message: "invalid id" })
    try {
        const plan = await Plan.findById(req.params.id);
       delete plan.users [users.indexOf(req.body._id)]
       res.json(plan)
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  module.exports = router