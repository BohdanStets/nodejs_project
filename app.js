const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/database");
const pages = require("./routes/pages");
const adminPages = require("./routes/admin_pages");

const PORT = 3000;
//Init app
const app = express();

//Connect to DB
mongoose.connect(config.database);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to DB");
});

//View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Set public folder
app.use(express.static(path.join(__dirname, "public")));

//set routes
app.use("/", pages);
app.use("/admin/pages", adminPages);


app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}!`);
});
