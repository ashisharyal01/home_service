'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SliderImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SliderImage.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SliderImage',
  });
  
  SliderImage.associate = function (models) {

    SliderImage.hasMany(models.Photo, { 
      as:"photos", 
      foreignKey: "sliderImageId" 
    });
  }
  return SliderImage;
};