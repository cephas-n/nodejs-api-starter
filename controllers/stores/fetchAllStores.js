const Store = require("../../models/Store");

const fetchAllStores = async (req, res) => {
  const stores = await Store().findAll();
  res.json({ stores });
};

module.exports = fetchAllStores;
