'use strict';
module.exports = (sequelize, DataTypes) => {
  const FileUpload = sequelize.define('FileUpload', {
    fileName: DataTypes.STRING,
    fileSize: DataTypes.DOUBLE,
    mimeType: DataTypes.STRING,
    extension: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true
  });

 

  
  return FileUpload;
};