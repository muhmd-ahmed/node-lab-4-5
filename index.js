const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config({ path: "./.env" })
const userRouter = require("./routes/user")
const planRouter = require("./routes/plan")
const planSubscribeRouter = require("./routes/subscribe")
const planUnsubscribeRouter = require("./routes/unsubscribe")
const authRouter = require("./routes/auth");
const auth = require("./middelwar/auth");
const filterAdmin = require("./middelwar/filter");

const app = express();

// middleware
app.use(express.json());



app.use("/users", userRouter);
app.use("/api/auth", authRouter);
app.use(auth);
app.use(filterAdmin);
app.use("/plans", planRouter);
app.use("/plans/subscribe",planSubscribeRouter)
app.use("/plans/unsubscribe",planUnsubscribeRouter)

//connection to database
mongoose
  .connect("mongodb://localhost/moddb")
  .then(async () => {
    console.log("successfully connected to moddb");
    // start backend erver
    app.listen(3000, () => {
      console.log("Server listeing on port 3000");
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
