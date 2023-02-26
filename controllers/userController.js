const mongoose = require("mongoose");
const User = require("../models/userModel");

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1});
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "no user found"});
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({error: "no user found"});
  }
  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "no user found"});
  }
  const user = await User.findOneAndUpdate(
    {_id: id},
    {
      ...req.body,
    }
  );
  if (!user) {
    return res.status(400).json({error: "no user found"});
  }
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const {userName, email, password} = req.body;
  try {
    const user = await User.create({userName, email, password});
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
const deleteUser = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "no user found"});
  }
  const user = await User.findOneAndDelete({_id: id});
  if (!user) {
    return res.status(400).json({error: "No user found"});
  }
  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
