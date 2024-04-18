const Product = require("../../models/Product");

const createProduct = async (req, res) => {
  try {
    const { title, price, labels, description, images, storeId } =
      await req.body;

    const { dataValues: product } = await Product().create({
      title,
      price,
      labels,
      description,
      images,
      storeId,
    });

    res.status(201).send({ product });
  } catch (err) {
    console.error(err);
  }
};

module.exports = createProduct;
