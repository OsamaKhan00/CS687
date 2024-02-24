const express = require("express");
const router = express.Router();

const clientDrugInfoController = require("../controllers/client_drug_info");
// const checkAuth = require("../middlewares/check-auth");

router.post("/createDrugInfo", clientDrugInfoController.createDrugInfo);

// router.post("/signup", usersController.createAccount);
module.exports = router;
