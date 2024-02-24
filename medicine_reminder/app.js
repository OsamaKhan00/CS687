const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
//routes
//app declaration
const app = express();
var cron = require("node-cron");
const userRoutes = require("./routes/users");
const clientDrugInfoRoutes = require("./routes/client_drug_info");

var cors = require("cors");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use("/api/user", userRoutes);
app.use("/api/client", clientDrugInfoRoutes);

module.exports = app;

// cron.schedule("0 */15 * * * *", function () {
//   console.log("Cron Running");
//   checkfilecontroller.getAllblogs();
//   //   helper.expired_docs();
//   // helper.invoice_reminder();
//   // helper.partial_customers();
// });
