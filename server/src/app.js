const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const {config} = require("dotenv");

config({path : "./.env"});
const app = express();

app.use(logger("dev"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "public")));

//routes import
const userRoute = require("./routes/user.route");
const projectRoute = require("./routes/project.route");
const configRoute = require("./routes/config.route");

//routes declaration
app.use("/api/users", userRoute);
app.use("/api/project", projectRoute);
app.use("/api/config" , configRoute);

module.exports = { app };
