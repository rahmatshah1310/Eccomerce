const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const { mongooseConnection } = require("./config/db");
const loggerMiddleware = require("./middlewares/logger.mw");
const responseMiddleware = require("./middlewares/response.mw");

const app = express();

// Connect MongoDB
mongooseConnection();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret2025",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(loggerMiddleware);
app.use(responseMiddleware);
app.use(express.static("public"));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Routes
app.use("/api/v1", require("./routes/auth.routes"));
app.use("/api/v1", require("./routes/index"));

// Root route
app.get("/", (req, res) => res.render("index", { title: "Ecommerce" }));

// 404 & error handling
app.use((req, res) => res.status(404).send("Page Not Found"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
