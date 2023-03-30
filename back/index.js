// IMPORT DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// IMPORT ROUTERS
const userRoutes = require("./routes/userRouter");
const postRoutes = require("./routes/postRouter");

// INSTANTIATE APP
const app = express();

// INITIAL MIDDLEWARE
// parse incoming requests with JSON payloads
app.use(express.json());
// enable CORS
app.use(cors());

// ROUTES
/* these are the main routes that the app will use, 
the rest of the routes are nested within these using router.use()
 see the comments in the router files for more info */
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// DATABASE CONNECTION
// initial connection attempt to MongoDB
mongoose.connect(process.env.DB_STRING).catch((error) => {
  console.log(error);
});

// establish database connection
mongoose.connection.on("connected", () => {
  console.log("connected to database");
  app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
  });
});

// monitor connection
mongoose.connection.on("error", (error) => {
  console.log(error);
});
