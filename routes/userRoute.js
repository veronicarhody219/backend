const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");


const express = require("express");

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser);
router.post("/", createUser);

router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
