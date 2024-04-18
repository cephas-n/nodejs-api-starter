const apiError = require("../../exceptions/apiError");
const Product = require("../../models/Product");
const zod = require("zod");

const productSchema = zod.object({
  title: zod.string().max(255).min(1).optional(),
  price: zod.number().min(0).optional(),
  labels: zod.array(zod.string()).min(1).optional(),
  images: zod.array(zod.string()).min(1).optional(),
  description: zod.string().max(255).min(1).optional(),
});

const updateProduct = async (req, res) => {
  try {
    const body = await req.body;

    await productSchema.parseAsync(body);

    const { title, price, labels, description, images } = body;

    const product = await Product().findByPk(req.params.id);

    if (!product) {
      res.sendStatus(404);
    }

    const updated = await product.update({
      title,
      price,
      labels,
      description,
      images,
    });

    res.send(updated);
  } catch (err) {
    apiError(err, res);
  }
};

module.exports = updateProduct;
