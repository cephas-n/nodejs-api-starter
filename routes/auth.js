const express = require("express");
const authenticateUser = require("../controllers/users/authenticateUser");
const router = express.Router();

router.post("/login", authenticateUser);

module.exports = router;
