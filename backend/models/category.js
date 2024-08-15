'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  category.init({
    categoryName: DataTypes.STRING,
    categoryDescription:DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'category',
  });

  category.associate = function (models) {
    category.hasMany(models.Item, { as: "items", foreignKey: "id"});
  };
  return category;
};