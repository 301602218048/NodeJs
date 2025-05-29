const Stores = require("../models/store");

const addItem = async (req, res) => {
  try {
    const { itemName, description, price, quantity } = req.body;
    const item = await Stores.create({
      itemName,
      description,
      price,
      quantity,
    });
    res.status(201).json({
      msg: `item ${itemName} successfully added`,
      data: item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

const getAllItems = async (req, res) => {
  try {
    const item = await Stores.findAll();
    if (item.length == 0) {
      res.status(404).json({ msg: "No item in database", data: null });
      return;
    }
    res.status(200).json({
      msg: "Here is the list of all items",
      data: item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Stores.findByPk(id);
    if (!item) {
      res.status(404).json({ msg: "item not found", data: null });
      return;
    }
    await Stores.destroy({ where: { id: id } });
    res
      .status(200)
      .json({ msg: `item with id ${id} has been deleted`, data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

const getItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Stores.findByPk(id);
    if (!item) {
      res.status(404).json({ msg: "expense not found", data: null });
      return;
    }
    res.status(200).json({
      msg: `Here is the item of id ${id}`,
      data: item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

const editItem = async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body;
    const item = await Stores.findByPk(id);
    if (!item) {
      res.status(404).json({ msg: "item not found", data: null });
      return;
    }
    item.quantity = quantity;
    await item.save();
    res.status(200).json({ msg: "item updated successfully", data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

module.exports = {
  addItem,
  getAllItems,
  getItemById,
  deleteItem,
  editItem,
};
