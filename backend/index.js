const express = require("express");
const HttpError = require("./utils/http-error");
const app = express();
const cors = require("cors");
const { authMiddleware } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

app.use(cors());

app.use(express.json());
require("dotenv").config();
app.use("/api/auth", authRoutes);
app.use("/api/user", authMiddleware, userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("can't find route", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  req.status = error.code || 400;
  res.send({
    status: "faild",
    message: error.message || "sonthing went wrong !",
  });
});

app.listen(process.env.PORT, () => {
  console.log("server is runin now");

  try {
      require("./utils/db.config");
    
  } catch (error) {
    console.log(error.message);
        
  }
});
