const models = require("../models/");
const fs = require("fs");
const path = require("path");

exports.singleFileUpload = async (req, res) => {
  if (!req.file) {
    return res.send("Please select an image to upload!!");
  }
  const file = req.file;

  try {
    const fileData = {
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      extension: path.extname(file.originalname),
    };

    const newFile = await models.FileUpload.create(fileData);

    return res.status(201).json({
      message: "Image Uploaded Successfully!!",
      file: newFile,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.multipleFileUpload = async (req, res) => {
  try {
    var uploadedImages = [];
    const filepromises = req.files.map(async (file) => {
      const fileData = {
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        extension: path.extname(file.originalname),
      };
      const imageDetails = await models.FileUpload.create(fileData);
      uploadedImages.push({ imageId: imageDetails.id });
    });

    await Promise.all(filepromises);
    return res.status(201).json({
      message: "Images Uploaded Successfully!!",
      file: uploadedImages,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getFileById = async (req, res) => {
  const fileId = req.params.fileId;
  try {
    const result = await models.FileUpload.findByPk(fileId);
    if (!result) {
      return res.status(404).json({
        message: "File Data Not Available!!",
      });
    }
    return res.status(200).json({
      fileData: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const allFiles = await models.FileUpload.findAll();
    if (allFiles.count <= 0) {
      return res.status(404).json({
        message: "Files Not Found!!",
      });
    }
    return res.status(200).json(allFiles);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteFile = async (req, res) => {
  const fileId = req.params.fileId;
  try {
    let fileData = await models.FileUpload.findByPk(fileId);
    if (fileData.fileName) {
      let fileToBeDeleted = "uploads/images/" + fileData.fileName;
      fs.unlinkSync(fileToBeDeleted);
    }
    let result = await models.FileUpload.destroy({
      where: { id: fileId },
    });
    if (result) {
      res.status(200).json({
        message: "File deleted successfully!!",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
