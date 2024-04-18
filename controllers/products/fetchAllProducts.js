const Product = require("../../models/Product");

const fetchAllProducts = async (req, res) => {
  const products = await Product().findAll();
  res.json({ products });
};

module.exports = fetchAllProducts;
