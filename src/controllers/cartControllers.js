const cartModel = require("../models/cartModels");

const createCart = async (req, res) => {
  try {
    let cartData = req.body;
    let { cartType, customerName, status, vision, customerID } = cartData;
    let totalNumber = await cartModel.find();
    let cartNumber = "C" + totalNumber.length + 1;
    let cart = {
      cartType,
      customerName,
      status,
      vision,
      customerID,
      cartNumber,
    };
    let cartDetail = await cartModel.create(cart);
    return res.status(201).send({ status: true, Cart: cartDetail });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ Message: err });
  }
};

const getCart = async (req, res) => {
  try {
    let cartData = await cartModel.find();
    return res.status(200).send({ status: true, CartData: cartData });
  } catch (err) {
    return res.status(500).send({ Message: err });
  }
};

module.exports = { createCart, getCart };
