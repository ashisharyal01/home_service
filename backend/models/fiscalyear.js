'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FiscalYear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FiscalYear.init({
    year: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'FiscalYear',
  });

  FiscalYear.associate = function (models) {
    FiscalYear.hasMany(models.Order, { as: "Fiscalyearorders", foreignKey: "fiscalYearId"});
  };

  return FiscalYear;
};