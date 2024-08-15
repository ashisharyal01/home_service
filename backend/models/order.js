'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    customerId: DataTypes.STRING,
    fiscalYearId: DataTypes.INTEGER,
    orderLocation: DataTypes.STRING,
    workStatus: DataTypes.STRING,
    orderDate: DataTypes.DATEONLY,
    totalOrderAmount: DataTypes.FLOAT,
    discountAmount: DataTypes.FLOAT,
    registerBy:DataTypes.INTEGER,
    vatAmount: DataTypes.FLOAT,
    grandTotal: DataTypes.FLOAT,
    remarks: DataTypes.STRING,
    orderInvoiceNo:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });


  Order.associate = function (models) {
    Order.belongsTo(models.Customer, { as: "customer", foreignKey: "customerId" });
    Order.belongsTo(models.User, { as: "user", foreignKey: "registerBy" });
    // Order.hasMany(models.Item, { as: "orderss", foreignKey: "orderId"});
    Order.hasMany(models.OrderedItem), { as: "orderss", foreignKey: "orderId" }
    Order.belongsTo(models.FiscalYear, { as: "fiscalYear", foreignKey: "fiscalYearId" });
  };

  return Order;
};