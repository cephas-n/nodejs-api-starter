const apiError = require("../../exceptions/apiError");
const Product = require("../../models/Product");

const fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product().findByPk(id);

    if (!product) {
      return res.sendStatus(404);
    }

    return res.status(200).send({ product });
  } catch (err) {
    apiError(err, res);
  }
};

module.exports = fetchProductById;
