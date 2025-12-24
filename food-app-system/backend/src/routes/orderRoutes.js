import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Order from "../models/Order.js";
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
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id.replace(/^#/, '').toUpperCase();
    let order;
    
    // If ID is 6 characters (short format), search by last 6 chars
    if (id.length === 6) {
      const allOrders = await Order.find().populate("items.menuItem");
      order = allOrders.find(o => o._id.toString().slice(-6).toUpperCase() === id);
    } else {
      // Full MongoDB ID
      order = await Order.findById(id).populate("items.menuItem");
    }
    
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
});
router.patch("/:id", async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (status) order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
