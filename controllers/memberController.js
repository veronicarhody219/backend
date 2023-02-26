const Member = require("../models/memberModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const signupMember = async (req, res) => {
  const {email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const member = await Member.create({email, password: hashedPassword});
  const token = jwt.sign({member}, process.env.SECRET, {expiresIn: "1d"});
  console.log(token);
  console.log(member);

  res.status(200).json({token});
};
const loginMember = async (req, res) => {
  const {email, password} = req.body;
  const member = await Member.findOne({email});
  if (!member) {
    res.status(400).json("incorrect email");
  }
  const isPasswordCorrect = member.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(400).json("incorrect password");
  }
  const token = jwt.sign({member}, process.env.SECRET, {expiresIn: "1d"});
  res.status(200).json({email, token});

  // try {
  //   console.log(member);
  // } catch (error) {
  //   res.status(400).json({error: error.message});
  // }
};
// const signupMember = async (req, res) => {
//   const password = await bcrypt.hash(req.body.password, saltRounds);
//   const data = {...req.body, password};
//   const user = await Member.create(data);
//   res.json({user});
// };

// const loginMember = async (req, res) => {
//   const user = await Member.findOne({email: req.body.email});
//   if (!user) {
//     res.status(404).json({error: "User not found"});
//     return;
//   }

//   if (!(await bcrypt.compare(req.body.password, user.password))) {
//     res.status(404).json({error: "User not found"});
//     return;
//   }

//   const token = await jwt.sign({user}, "fake-jwt-secret");
//   res.json({user, access_token: token});
// };

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"});
// };

// memberSchema.statics.signup = async function (email, password) {
//   const exists = await this.findOne({email});
//   if (exists) {
//     throw Error("Email already in use");
//   }
//   if (!email || !password) {
//     throw Error("All fields must be filled");
//   }
//   //   if (!validator.isEmail(email)) {
//   //     throw Error("Email is not valid");
//   //   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);
//   const member = await this.create({email, password: hash});
//   return member;
// };
// memberSchema.statics.login = async function (email, password) {
//   if (!email || !password) {
//     throw Error("All fields must be filled");
//   }
//   const member = await this.findOne({email});
//   if (!member) {
//     throw Error("Incorrect email");
//   }
//   const match = await bcrypt.compare(password, member.password);
//   if (!match) {
//     throw Error("Incorrect password");
//   }
//   return member;
// };

// const signupMember = async (req, res) => {

//   const {email, password} = req.body;
//   try {
//     const member = await Member.signup(email, password);
//     const token = createToken(member._id);
//     res.status(200).json({email, token});
//   } catch (error) {
//     res.status(400).json({error: error.message});
//   }
// };
// const loginMember = async (req, res) => {
//   const {email, password} = req.body;
//   try {
//     const member = await Member.login(email, password);
//     const token = createToken(member._id);
//     res.status(200).json({email, token});
//   } catch (error) {
//     res.status(400).json({error: error.message});
//   }
// };
const getMembers = async (req, res) => {
  const members = await Member.find({}).sort({createdAt: -1});
  res.status(200).json(members);
};

module.exports = {
  signupMember,
  loginMember,
  getMembers,
};
