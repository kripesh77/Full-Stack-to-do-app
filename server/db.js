require("dotenv").config();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

const Todo = new Schema({
  description: String,
  done: Boolean,
  id: String,
  userId: ObjectId,
});

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

module.exports = {
  UserModel,
  TodoModel,
};
