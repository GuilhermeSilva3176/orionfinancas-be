const express = require("express");
const authMiddleware = require("../middlewares/auth.js");
const usersController = require("../controllers/usersController.js");

const router = express.Router();

router.get("/admin", authMiddleware.verifyToken, usersController.getAdminUsers);

module.exports = router;
