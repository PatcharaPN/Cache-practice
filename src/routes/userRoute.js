import express from "express";
import { createUser, getAllUser } from "../controllers/userController.js";
const router = express.Router();

router.get("/users", getAllUser);
router.post("/users", createUser);

export default router;
