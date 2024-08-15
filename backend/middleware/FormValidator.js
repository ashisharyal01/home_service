const { check, validationResult } = require("express-validator");
const models = require("../models");
const fs = require("fs");

exports.validateUser = [
  check("fullName")
    .notEmpty()
    .withMessage("Full name is required!!")
    .matches("^[A-Za-z ]+$")
    .withMessage("Please enter valid full name!!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!!"),
  check("email")
    .notEmpty()
    .withMessage("Email is required!!")
    .custom((email, { req }) => {
      if (req.params.id) {
        const userId = req.params.id;
        return models.User.findOne({ where: { id: userId } }).then(
          (checkdata) => {
            if (email == checkdata.email) {
            } else {
              return models.User.findOne({ where: { email: email } }).then(
                (userdata) => {
                  if (userdata) {
                    throw "Email already exists!!";
                  }
                }
              );
            }
          }
        );
      } else {
        return models.User.findOne({ where: { email: email } }).then((user) => {
          if (user) {
            throw "Email already exists!!";
          }
        });
      }
    })
    .isEmail()
    .withMessage("Invalid email address!!"),

  check("password")
    .notEmpty()
    .withMessage("Password is required!!")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    .withMessage(
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter,one number and one special character"
    ),

  check("mobileNumber")
    .notEmpty()
    .withMessage("Mobile number is required!!")
    .custom((mobileNumber, { req }) => {
      if (req.params.id) {
        const user_Id = req.params.id;
        return models.User.findOne({ where: { id: user_Id } }).then(
          (checkdata) => {
            if (mobileNumber == checkdata.mobileNumber) {
            } else {
              return models.User.findOne({
                where: { mobileNumber: mobileNumber },
              }).then((result) => {
                if (result) {
                  throw "MobileNumber is already registered!!";
                }
              });
            }
          }
        );
      } else {
        return models.User.findOne({
          where: { mobileNumber: mobileNumber },
        }).then((result) => {
          if (result) {
            throw "MobileNumber is already registered!!";
          }
        });
      }
    })
    .matches("^([9][0-9]{9})$")
    .withMessage("Please enter valid MobileNumber!!"),

  check("gender")
    .notEmpty()
    .withMessage("Gender is required!!")
    .isIn(["Male", "Female", "Others"])
    .withMessage("Please provide valid Gender!!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validatePassword = [
  check("password")
    .notEmpty()
    .withMessage("Password is required!!")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    .withMessage(
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter,one number and one special character"
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateCategory = [
  check("categoryName")
    .notEmpty()
    .withMessage("category name is required!!")
    .matches("^[A-Za-z ]+$")
    .withMessage("Please enter valid full name!!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateFiscalYear = [
  check("year").notEmpty().withMessage("fiscal year is required!!"),

  check("year")
    .notEmpty()
    .withMessage("Fiscal year is required!!")
    .custom((year, { req }) => {
      if (req.params.id) {
        const user_Id = req.params.id;
        return models.FiscalYear.findOne({ where: { id: user_Id } }).then(
          (checkdata) => {
            if (year == checkdata.year) {
            } else {
              return models.User.findOne({ where: { year: year } }).then(
                (result) => {
                  if (result) {
                    throw "Fiscal year is already registered!!";
                  }
                }
              );
            }
          }
        );
      } else {
        return models.FiscalYear.findOne({ where: { year: year } }).then(
          (result) => {
            if (result) {
              throw "Fiscal year is already registered!!";
            }
          }
        );
      }
    })
    .withMessage("Fiscal year is already registered!!!!"),

  //changed
  // check('status').notEmpty
  // .withMessage('status is required!!'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateCustomer = [
  check("customerName").notEmpty().withMessage("customer name is required!!"),
  check("customerAddress")
    .notEmpty()
    .withMessage("customer address is required!!"),

  check("customerPhoneNumber")
    .notEmpty()
    .withMessage("Mobile number is required!!")
    .custom((customerPhoneNumber, { req }) => {
      if (req.params.id) {
        const user_Id = req.params.id;
        return models.Customer.findOne({ where: { id: user_Id } }).then(
          (checkdata) => {
            if (customerPhoneNumber == checkdata.customerPhoneNumber) {
            } else {
              return models.Customer.findOne({
                where: { customerPhoneNumber: customerPhoneNumber },
              }).then((result) => {
                if (result) {
                  throw "Customer phone number is already registered!!";
                }
              });
            }
          }
        );
      } else {
        return models.Customer.findOne({
          where: { customerPhoneNumber: customerPhoneNumber },
        }).then((result) => {
          if (result) {
            throw "Customer phone number is already registered!!";
          }
        });
      }
    })
    .matches("^([9][0-9]{9})$")
    .withMessage("Please enter valid MobileNumber!!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateOrder = [
  check("customerId").notEmpty(),
  check("orderLocation").notEmpty().withMessage("order location is required!!"),
  check("workStatus").notEmpty().withMessage("status is required!!"),
  check("orderDate").notEmpty().withMessage("orderDate is required!!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateTransaction = [
  check("transactionDate")
    .notEmpty()
    .withMessage("Transaction date is required!!"),
  check("paidAmount").notEmpty().withMessage("Paid amount is required!!"),
  check("paymentMethod").notEmpty().withMessage("Payment method is required!!"),
  check("customerId").notEmpty().withMessage("Customer name is required!!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateItem = [
  check("name").notEmpty().withMessage("item name is required!!"),
  check("categoryId").notEmpty().withMessage("category id is required!!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
