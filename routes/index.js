const express = require("express");
const fetchAllProducts = require("../controllers/products/fetchAllProducts");
const fetchAllStores = require("../controllers/stores/fetchAllStores");
const router = express.Router();

router.get("/products", fetchAllProducts);

router.get("/stores", fetchAllStores);

module.exports = router;
