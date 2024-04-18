const apiError = require("../../exceptions/apiError");
const Product = require("../../models/Product");

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product().findByPk(id);

    if (!product) {
      res.sendStatus(404);
    }

    await product.destroy();

    return res.status(200).send({ id });
  } catch (err) {
    apiError(err, res);
  }
};

module.exports = deleteProduct;
