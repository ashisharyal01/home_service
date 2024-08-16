const model = require("../models");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");

// multer configuration for handling the filename and destination of files
const storage = multer.diskStorage({
  destination: (req, file, storeFileFunction) => {
    storeFileFunction(null, "./uploads/images");
  },

  filename: (req, file, fileInfoFunction) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    fileInfoFunction(null, fileName);
  },
});

// function for uploading single files
const fileUploadData = multer({ storage }).single("filename");

exports.saveItem = async (req, res) => {
  try {
    fileUploadData(req, res, async (error) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Error while uploading the file" });
      }
      const newFileData = await model.Item.create({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        categoryId: req.body.categoryId,
        filename: req.file.filename,
      });

      return res
        .status(201)
        .json({ message: "File uploaded successfully!!", data: newFileData });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error!!" });
  }

  // console.log(fileUploadData, "some");
  // try {
  //   console.log("hello");
  //   fileUploadData(req, res, (error) => {
  //     if (error) {
  //       console.error(error);
  //       return res
  //         .status(500)
  //         .json({ error: "Error while uploading the file" });
  //     }
  //   });
  //   const itemData = {
  //     name: req.body.name,
  //     address: req.body.address,
  //     email: req.body.email,
  //     categoryId: req.body.categoryId,
  //     filename: req.file.filename,
  //   };
  //   try {
  //     let newItem = await model.Item.create(itemData);
  //     res.status(201).json({
  //       message: "Item created sucessfully",
  //       data: newItem,
  //     });
  //   } catch (err) {
  //     res.status(500).json({
  //       error: err.message,
  //       message: "Internal Server Error",
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ message: "Internal Server Error!!" });
  // }
};

exports.getItem = async (req, res) => {
  try {
    let items = await model.Item.findAndCountAll({
      include: [
        {
          model: model.category,
          as: "categories",
        },
      ],
    });
    return res.status(200).json({
      data: items,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

exports.showItemById = async (req, res) => {
  const itemId = req.params.id;

  try {
    let items = await model.Item.findByPk(itemId, {
      include: [
        {
          model: model.category,
          as: "categories",
        },
      ],
    });
    res.status(200).json({
      data: items,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

exports.updateItem = async (req, res) => {
  const itemId = req.params.id;
  const itemData = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    categoryId: req.body.categoryId,
  };
  try {
    let newItem = await model.Item.update(itemData, { where: { id: itemId } });
    res.status(201).json({
      message: "Item updated sucessfully",
      data: newItem,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

exports.deleteItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    await model.Item.destroy({ where: { id: itemId } });
    res.status(200).json({
      message: "Item deleted sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
