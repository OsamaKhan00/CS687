const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
// const checkAuth = require("../middlewares/check-auth");

router.post("/login", usersController.login);
router.post("/signup", usersController.createUser);

// router.post("/signup", usersController.createAccount);
module.exports = router;
