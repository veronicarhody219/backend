const express = require("express");
const {
  signupMember,
  loginMember,
  getMembers,
} = require("../controllers/memberController");
const router = express.Router();

router.get("/", getMembers);
router.post("/login", loginMember);
router.get("/login", getMembers);
router.post("/signup", signupMember);
router.get("/signup", getMembers);

module.exports = router;
