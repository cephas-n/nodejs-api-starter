const apiError = require("../../exception/apiError");
const Product = require("../../models/Product");

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product().findByPk(id);

    await product.destroy();

    return res.status(200).send({ id });
  } catch (err) {
    apiError(err, res);
  }
};

module.exports = deleteProduct;
