const apiError = require("../../exceptions/apiError");
const Product = require("../../models/Product");
const Store = require("../../models/Store");
const yup = require("yup");

const productSchema = yup
  .object({
    title: yup.string().max(255),
    price: yup.number().min(0),
    labels: yup.array(yup.string()).min(1),
    images: yup.array(yup.string()).min(1),
    storeId: yup.number().min(1),
    description: yup.string().max(255),
  })
  .test("store should exist", async ({ storeId }, ctx) => {
    const store = await Store().findByPk(storeId);
    if (!store) {
      return ctx.createError({ message: "Store Id does not exist" });
    }
    return true;
  });

const createProduct = async (req, res) => {
  try {
    const body = await req.body;

    await productSchema.validate(body, {
      abortEarly: true,
    });

    const { title, price, labels, description, images, storeId } = body;

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
    apiError(err, res);
  }
};

module.exports = createProduct;
