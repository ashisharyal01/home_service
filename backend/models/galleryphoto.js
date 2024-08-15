'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GalleryPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GalleryPhoto.init({
    imageId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'GalleryPhoto',
  });
  GalleryPhoto.associate = function (models) {
    GalleryPhoto.belongsTo(models.FileUpload, { as: "albumImage", foreignKey: "imageId"});
  }
  return GalleryPhoto;
};