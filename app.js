const express = require("express");
const morgan = require("morgan");
const userRouter = require("./Route/userRoute");
const userControllers = require("./controllers/userController");

const app = express();
//Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/api/v1/users", userRouter);
app.all("*", (req, res, next) => {
  console.log(`Can't find ${req.originalUrl} on this server`, 404);
});
module.exports = app;
