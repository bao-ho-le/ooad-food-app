import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  createOrder,
  getOrder,
  listOrders,
} from "../controllers/orderController.js";

const router = Router();

// Auth optional: attach user if token present but do not block requests
router.use(async (req, _res, next) => {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    try {
      const token = header.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.id);
      if (user) req.user = user;
    } catch (_e) {
      // ignore invalid token to keep route open
    }
  }
  next();
});

router.get("/", listOrders);
router.post("/", createOrder);
router.get("/:id", getOrder);

export default router;
