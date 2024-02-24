dataBase = require("../models");
const User = dataBase.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  let fetchedUser;
  if (req.body.email) {
    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed,email not found",
        });
      }
      fetchedUser = user;
      bcrypt
        .compare(req.body.password, user.encryptedPassword)
        .then((result) => {
          if (!result) {
            return res.status(401).json({
              message: "Incorrect Password.",
            });
          } else {
            res.status(200).json({
              user: fetchedUser,
            });
          }
          // if (fetchedUser.verified) {
          //   const token = jwt.sign(
          //     { email: fetchedUser.email, userId: fetchedUser.id },
          //     "akmakndalknadfa"
          //   );
          // } else {
          //   return res.status(400).json({
          //     message: "User not verified.",
          //   });
          // }
        })
        .catch((err) => {
          return res.status(401).json({
            message: "Invalid authentication credentials!",
          });
        });
    });
  } else {
    return res.status(400).json({
      message: "email and mobile missing!",
    });
  }
};

exports.createUser = (req, res, next) => {
  if (!req.body.user) {
    return res.status(400).json({
      message: "user object is not present!",
    });
  }

  if (!req.body.user.password) {
    return res.status(400).json({
      message: "password is not present!",
    });
  }

  if (!req.body.user.email) {
    return res.status(400).json({
      message: "email is not present!",
    });
  }

  if (!req.body.user.firstName) {
    return res.status(400).json({
      message: "first name is not present!",
    });
  }

  if (!req.body.user.lastName) {
    return res.status(400).json({
      message: "Last Name is not present!",
    });
  }
  // if (!req.body.user.role) {
  //   return res.status(400).json({
  //     message: "Role is not present!",
  //   });
  // }
  bcrypt.hash(req.body.user.password, 10).then((hash) => {
    const userObject = {
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      encryptedPassword: hash,
      mobile: req.body.user.mobile,
      email: req.body.user.email || "",
      age: req.body.user.age || null,
      verified: false,
    };
    // if (req.body.user.user_role == "admin") {
    //   const userObject = {
    //     firstName: req.body.user.firstName,
    //     lastName: req.body.user.lastName,
    //     encryptedPassword: req.body.user.encryptedPassword,
    //     mobile: req.body.user.mobile,
    //     email: req.body.user.email,
    //     business_email: req.body.user.business_email,
    //     business_mobile: req.body.user.business_mobile,
    //     bio: req.body.user.bio,
    //     residential_address: req.body.user.residential_address,
    //     business_address: req.body.user.business_address,
    //     industry: req.body.user.industry,
    //     user_role: req.body.user.user_role,
    //     otp: "",
    //     verified: true,
    //   };
    // }
    User.create(userObject)
      .then((userResponse) => {
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
  });
};
