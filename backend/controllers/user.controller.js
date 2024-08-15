const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

function signUp(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "email already exist",
        });
      } else {
        if (req.body.password !== req.body.confirmPassword) {
          fs.unlinkSync(req.file.path);
          return res.json({ message: "Password must be same!!" });
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        if (hashedPassword) {
          let createUser = models.User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            mobileNumber: req.body.mobileNumber,
            gender: req.body.gender,
            profilePictureId: req.body.profilePictureId,
            address: req.body.address,
            dateOfBirth: req.body.dateOfBirth,
          });

          if (createUser) {
            res.status(201).json({
              message: "User created",
            });
          } else {
            res.status(500).json({
              message: "Something went wrong. Please try again",
            });
          }
        } else {
          res.status(500).json({
            message: "Something went wrong. Please try again",
          });
        }
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong. Please try again",
      });
    });
}

function login(req, res) {
  const { password } = req.body;
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid email!",
        });
      } else {
        var passwordIsValid = bcrypt.compareSync(password, user.password);
        if (passwordIsValid) {
          var token = jwt.sign(
            {  userId: user.id,
               email: user.email,
               gender: user.gender,
               fullName: user.fullName,
               address: user.address,
               dateOfBirth: user.dateOfBirth,
               mobileNumber:user.mobileNumber
              },
            "secret",
            { expiresIn: 864000 }
          );
          const options = {
            expires: new Date(
              Date.now() + 5 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          if (token) {
            res.status(200).cookie("token", token, options).json({
              message: "LoggedIn Successfully!!",
              accessToken: token,
            });
          } else {
            res
              .status(500)
              .json({ message: "Something went wrong. Please try again!!" });
          }
        } else {
          res.status(401).json({
            message: "invalid credentials!",
          });
        }
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong. Please try again!",
      });
    });
}

async function show(req, res) {
  const UserData = await models.User.findAll({
    attributes: [
      "id",
      "fullName",
      "email",
      "mobileNumber",
      "gender",
      "address",
      "dateOfBirth",
      "profilePictureId"
    ],
    include: [
      {
        model: models.FileUpload,
        as: "profilePicture",
      }
  ]

  });
  if (UserData) {
    res.status(200).json({
      data: UserData,
    });
  } else if (!UserData) {
    res.status(404).json({
      message: "no data found",
    });
  } else {
    res.status(500).json({
      message: "Something went wrong. Please try again",
    });
  }
}

async function update(req, res) {
  const id = req.params.id;
  const user = await models.User.findByPk(id);
  let checkPassword = user.password;
  const userPassword = req.body.password;
  var passwordIsValid = bcrypt.compareSync(userPassword, checkPassword);
  console.log("isvalid", passwordIsValid);
  if (!passwordIsValid) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  let result = await models.User.update(
    {
      fullName: req.body.fullName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      gender: req.body.gender,
      profilePictureId: req.body.profilePictureId,
      address: req.body.address,
      dateOfBirth: req.body.dateOfBirth,
    },
    { where: { id: id } }
  );

  if (result) {
    res.status(200).json({ message: "user updated sucessfully" });
  } else {
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
}
async function showById(req, res) {
  const id = req.params.id;
  const user = await models.User.findByPk(id,{
    attributes: [
      "id",
      "fullName",
      "email",
      "mobileNumber",
      "gender",
      "address",
      "dateOfBirth",
      "profilePictureId"
    ],
    include: [
      {
        model: models.FileUpload,
        as: "profilePicture",
      }
  ]}
    );

  if (user) {
    res.status(201).json({ data: user });
  }
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;

  const result = await models.User.destroy({ where: { id: id } });
  if (result) {
    res.status(200).json({ message: "User deleted sucessfully", data: result });
  } else {
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
}

module.exports = {
  signUp: signUp,
  login: login,
  show: show,
  showById: showById,
  update: update,
  deleteUser: deleteUser,
};
