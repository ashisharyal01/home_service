const model = require("../models");
const { Op } = require("sequelize");

exports.saveItem = async (req, res) => {
  const itemData = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    categoryId: req.body.categoryId,
  };
  try {
    let newItem = await model.Item.create(itemData);
    res.status(201).json({
      message: "Item created sucessfully",
      data: newItem,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
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
