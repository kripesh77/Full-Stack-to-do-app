require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const MY_DATABASE_LINK = process.env.MY_DATABASE_LINK;

const allowedOrigin = process.env.CORS_ORIGIN;

const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json());

app.use(
  cors({
    origin: allowedOrigin,
  })
);

const { UserModel, TodoModel } = require("./db");
const authMiddleware = require("./auth");

let databaseConnected = false;
async function connectDB() {
  try {
    await mongoose.connect(MY_DATABASE_LINK);
    databaseConnected = true;
  } catch (error) {
    console.log("Database connection failed");
  }
}

function dbConnectionCheck(req, res, next) {
  if (!databaseConnected) {
    res.json({
      message: "We're having some issues, please try again later",
    });
    return;
  } else {
    next();
  }
}

app.use(dbConnectionCheck);
app.use(cors());

app.post("/signup", (req, res) => {
  const requiredBody = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    name: z.string({ message: "Invalid username format" }),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.status(400).json({
      message: "Incorrect Format",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  bcrypt.hash(password, 5, async function (err, hashedPassword) {
    if (err) {
      res.json({ message: "Error in the mid, please try again" });
      return;
    }

    try {
      await UserModel.create({
        email,
        password: hashedPassword,
        name,
      });

      res.json({ message: "You're signed up" });
    } catch (error) {
      if (error.code == "11000") {
        res.json({ message: "Email already exists" });
        return;
      } else {
        res.json({
          message: "Cannot connect to the database, please try again later",
        });
      }
    }
  });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    res.status(403).json({
      message: "User doesnot exists",
    });
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      res.json({
        message: "Technical error occured, please try again later",
      });
      console.log("Error occured while comparing passwords", err);
      return;
    }

    if (result) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );
      res.json({
        token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  });
});

//todo is an authenticated endpoint
app.post("/todo", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const description = req.body.description;
  const id = req.body.id;

  await TodoModel.create({
    description,
    done: false,
    id,
    userId,
  });

  res.json({
    userId: req.userId,
  });
});

//todos is also an authenticated endpoint
//It extracts all the todos that the user has added in the database
app.get("/todos", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const todos = await TodoModel.find({ userId });
  res.json({
    todos,
  });
});

app.put("/todo/:id/toggle", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;

  try {
    const todo = await TodoModel.findOne({ id, userId });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.done = !todo.done;
    await todo.save();

    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.log("Toggle error", error);
    res.status(500).json({ message: "Toggle failed" });
  }
});

app.delete("/todo/:id", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;

  try {
    const deleted = await TodoModel.findOneAndDelete({ id, userId });

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.log("Delete error", error);
    res.status(500).json({ message: "Delete failed" });
  }
});

// Update a todo's description
app.put("/todo/:id", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const { description } = req.body;

  if (!description || !id || !userId) return;

  try {
    const todo = await TodoModel.findOne({ id, userId });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.description = description;
    await todo.save();

    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.log("Update error", error);
    res.status(500).json({ message: "Update failed" });
  }
});

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

//Due to asynchronous nature of js, we've to always connect to the database and then only start our server
connectDB()
  .then(() => {
    app.listen(2000, () => {
      console.log("Server started at port 2000");
    });
  })
  .catch((error) => console.log("Failed to connect", error));
