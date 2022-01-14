const express = require("express");
const { Plan } = require("../model/plan");
const { User } = require("../model/user");
const mongoose = require("mongoose");
const router = express.Router();
const toid=mongoose.Types.ObjectId;

router.post("/:id", async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid plan id" })
    const user_idisValid = mongoose.Types.ObjectId.isValid(req.body);
    if (!user_idisValid) return res.status(400).json({ message: "invalid user id" })
    try {
        const plan = await Plan.findById(req.params.id);
        const user=await User.findById(req.body.id)
          if(!user)return res.status(401).json({ message: " user id not exist" })

          plan.users.map((ele)=>{
          
            if(String(ele) === String(toid(req.body.id))) 
  
            return res.status(400).json({ message: "exist user" });
          })
        plan.users.push(req.body.id);
        await plan.save();
        res.json(plan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  module.exports = router