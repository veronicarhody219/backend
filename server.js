const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/userRoute");
const memberRoutes = require("./routes/memberRoute");
const authenticateUser = require("./middleware/verifyToken");

const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`connnected to db and listen on port ${process.env.PORT}`)
  );
});
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/user", authenticateUser, userRoutes);
app.use("/api/auth", memberRoutes);
