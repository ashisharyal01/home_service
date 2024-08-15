'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderTransaction.init({
    transactionDate: DataTypes.DATEONLY,
    paidAmount: DataTypes.FLOAT,
    paymentMethod: DataTypes.STRING,
    transactionRemarks: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    orderTransactionNo:DataTypes.STRING,
    paymentStatus:DataTypes.STRING,
    registerBy:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderTransaction',
  });

  OrderTransaction.associate = function (models) {
    OrderTransaction.belongsTo(models.User, { as: "RegisterUser", foreignKey: "registerBy" });
    OrderTransaction.belongsTo(models.FiscalYear, { as: "fiscalYearTransaction", foreignKey: "fiscalYearId" });
    OrderTransaction.belongsTo(models.Customer, { as: "customer", foreignKey: "customerId"});
  };

  return OrderTransaction;
};