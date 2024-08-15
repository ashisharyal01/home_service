'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.ENUM('Male', 'Female', 'Others'),
    profilePictureId: DataTypes.INTEGER,
    dateOfBirth:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function (models) {
    User.belongsTo(models.FileUpload, { as: "profilePictures", foreignKey: "profilePictureId"});
  }
  return User;
};