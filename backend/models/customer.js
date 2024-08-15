'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
    }
  };
  Customer.init({
    customerName: DataTypes.STRING,
    customerAddress: DataTypes.STRING,
    customerPhoneNumber: DataTypes.STRING,
    payableAmount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Customer',
  });


  Customer.associate = function (models) {
    Customer.hasMany(models.Order, { as: "orders", foreignKey: "customerId"});
    Customer.hasMany(models.OrderTransaction, { as: "transactionOrder", foreignKey: "customerId"});

  };

  return Customer;
};