
require("dotenv").config();
require("./db");
const express = require("express");
const hbs = require('hbs');
const path = require('path');
const app = express();

// Handles the handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.__express);
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "dog-grooming-appointment-app";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
