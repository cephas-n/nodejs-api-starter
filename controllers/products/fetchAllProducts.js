const apiError = require("../../exception/apiError");
const Product = require("../../models/Product");

const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product().findAll();
    res.json({ products });
  } catch (err) {
    apiError(err, res);
  }
};

module.exports = fetchAllProducts;
