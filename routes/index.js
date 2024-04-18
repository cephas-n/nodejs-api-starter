const express = require("express");
const fetchAllProducts = require("../controllers/products/fetchAllProducts");
const fetchAllStores = require("../controllers/stores/fetchAllStores");
const createProduct = require("../controllers/products/createProduct");
const updateProduct = require("../controllers/products/updateProduct");
const router = express.Router();

router.route("/products/").get(fetchAllProducts).post(createProduct);
router.route("/products/:id").patch(updateProduct);

router.get("/stores", fetchAllStores);

module.exports = router;
