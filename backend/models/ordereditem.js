'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderedItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderedItem.init({
    orderId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    itemPrice: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    itemRemarks:DataTypes.STRING

  }, {
    sequelize,
    modelName: 'OrderedItem',
  });

  OrderedItem.associate = function (models) {
    OrderedItem.belongsTo(models.Order, { as: "orderlists", foreignKey: "orderId" });
    OrderedItem.belongsTo(models.Item, { as: "itemLists", foreignKey: "itemId" });

  };

  return OrderedItem;
};