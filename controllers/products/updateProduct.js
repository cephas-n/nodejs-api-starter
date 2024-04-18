const Product = require("../../models/Product");

const updateProduct = async (req, res) => {
  try {
    const { title, price, labels, description, images } = await req.body;

    const product = await Product().findByPk(req.params.id);

    const updated = await product.update({
      title,
      price,
      labels,
      description,
      images,
    });

    res.send(updated);
  } catch (err) {
    console.error(err);
  }
};

module.exports = updateProduct;
