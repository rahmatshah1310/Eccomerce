const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { ensureAuthenticated } = require("../middlewares/auth.mw");

router.post("/login", authController.local_login_post);
router.get("/me", ensureAuthenticated, authController.get_me);

module.exports = router;
