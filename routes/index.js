const express = require("express");
const fetchAllProducts = require("../controllers/products/fetchAllProducts");
const fetchAllStores = require("../controllers/stores/fetchAllStores");
const createProduct = require("../controllers/products/createProduct");
const updateProduct = require("../controllers/products/updateProduct");
const deleteProduct = require("../controllers/products/deleteProduct");
const fetchProductById = require("../controllers/products/fetchProductById");
const router = express.Router();

router.route("/products/").get(fetchAllProducts).post(createProduct);

router
  .route("/products/:id")
  .get(fetchProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

router.get("/stores", fetchAllStores);

module.exports = router;
