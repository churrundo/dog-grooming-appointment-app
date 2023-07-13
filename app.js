require("dotenv").config();
require("./db");
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const isAdmin = require('./middleware/isAdmin');
const isUser = require('./middleware/isUser');
const isLoggedIn = require('./middleware/isLoggedIn');
const isLoggedOut = require('./middleware/isLoggedOut');

// Handles the handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs.__express);
hbs.registerPartials(path.join(__dirname, "views/partials"));


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "dog-grooming-appointment-app";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const session = require(`express-session`);
const MongoStore = require(`connect-mongo`);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // Sessions last for 1 minute (for demo purposes)
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_URI ||
        "mongodb://localhost/dog-grooming-appointment-app",
      ttl: 24 * 60 * 60, // Time to live - session will stay active for 1 day
    }),
  })
);

app.use((req, res, next) => {
  if (req.session.currentUser) {
    res.locals.user = req.session.currentUser;
  }
  next();
});

const indexRoutes = require("./routes/index.routes");
app.use("/", isUser, isAdmin, isLoggedIn, isLoggedOut, indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

const ownerRoutes = require("./routes/owner.routes");
app.use("/owners", ownerRoutes);

const calendarRoutes = require('./routes/calendar.routes');
app.use("/calendar", calendarRoutes);

const appointmentRoutes = require('./routes/appointment.routes');
app.use('/appointment', appointmentRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
