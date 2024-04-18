const express = require("express");
const fetchAllProducts = require("../controllers/products/fetchAllProducts");
const fetchAllStores = require("../controllers/stores/fetchAllStores");
const createProduct = require("../controllers/products/createProduct");
const router = express.Router();

router.route("/products").get(fetchAllProducts).post(createProduct);

router.get("/stores", fetchAllStores);

module.exports = router;
