dataBase = require("../models");
const User = dataBase.users;
const drug_schedule = dataBase.drug_schedule;
const client_drug = dataBase.client_drug_info;
var helpers = require("./helpers");
var moment = require("moment");

exports.createDrugInfo = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).json({
      message: "userId is not present!",
    });
  }

  if (!req.body.drugName) {
    return res.status(400).json({
      message: "drugName is not present!",
    });
  }

  if (!req.body.drugQuantity) {
    return res.status(400).json({
      message: "drugQuantity is not present!",
    });
  }

  if (!req.body.start_date) {
    return res.status(400).json({
      message: "start_date is not present!",
    });
  }

  if (!req.body.end_date) {
    return res.status(400).json({
      message: "end_date is not present!",
    });
  }

  var dateArray = new Array();
  dateArray = await dateRange(req.body.start_date, req.body.end_date);
  console.log("dateArray", dateArray);

  const userObject = {
    userId: req.body.userId,
    drugName: req.body.drugName,
    drugQuantity: req.body.drugQuantity,
    whenToTake: req.body.whenToTake,
    message: req.body.message || "",
    start_date: req.body.start_date || null,
    end_date: req.body.end_date || null,
  };
  client_drug
    .create(userObject)
    .then(async (clientDrugInfoResponse) => {
      console.log("clientDrugInfoResponse", clientDrugInfoResponse);
      for (var i = 0; i < dateArray.length; i++) {
        await drug_schedule.create({
          userId: req.body.userId,
          clientDrugId: clientDrugInfoResponse.id,
          status: "pending",
          isMorning: req.body.isMorning,
          isEvening: req.body.isEvening,
          isAfternoon: req.body.isAfternoon,
          scheduleDate: dateArray[i],
        });
      }

      return res.status(200).json({
        message: "Operation Successful.",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong.",
        err: err || "",
      });
    });
};
function dateRange(startDate, endDate, steps = 1) {
  const dateArray = [];
  if (startDate == endDate) {
    dateArray.push(startDate + "T19:00:00.000Z");
    return dateArray;
  }
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
}
exports.sendNotifications = async (req, res, next) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {});
  helpers.sendNotification(
    devices[i].device_token,
    `Pro Pay Transaction Request`,
    `Request for Transaction of amount $${req.body.amount} has been generated against your propay account. Kindly review the request to approve it.`
  );
};
