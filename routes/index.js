const express = require("express");
const Product = require("../models/Product");
const Store = require("../models/Store");
const router = express.Router();

router.get("/products", async (req, res) => {
  const products = await Product().findAll();
  res.json({ products });
});

router.get("/stores", async (req, res) => {
  const stores = await Store().findAll();
  res.json({ stores });
});

module.exports = router;
