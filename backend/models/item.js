"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );

  Item.associate = function (models) {
    Item.belongsTo(models.category, {
      as: "categories",
      foreignKey: "categoryId",
    });
    // Item.hasMany(models.OrderedItem, { as: "ordereditems", foreignKey: "itemId"});
    // Item.belongsTo(models.Order, { as: "orders", foreignKey: "orderId"});
    //  Item.hasMany(models.OrderedItem, { as: "ordereditems", foreignKey: "itemId"});
  };

  return Item;
};
