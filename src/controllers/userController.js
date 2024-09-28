import User from "../models/userModels.js";
import { RedisClient } from "../configs/db/cache.js"; // Import RedisClient

const createUser = async (req, res) => {
  try {
    const { name, age, email } = req.body;

    const newUser = new User({
      name,
      age,
      email,
    });

    await newUser.save();
    await RedisClient.del("users");
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while creating user",
      error: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const cacheUser = await RedisClient.get("users");
    if (cacheUser) {
      return res.status(200).json({
        message: "from cache",
        data: JSON.parse(cacheUser),
      });
    }

    const users = await User.find();
    await RedisClient.set("users", JSON.stringify(users));

    res.status(200).json({
      message: "From DB",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

export { createUser, getAllUser };
