const apiError = require("../../exceptions/apiError");
const Product = require("../../models/Product");

const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product().findAll();
    
    return res.send({ products });
  } catch (err) {
    apiError(err, res);
  }
};

module.exports = fetchAllProducts;
