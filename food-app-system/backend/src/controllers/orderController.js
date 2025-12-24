import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";

export const createOrder = async (req, res, next) => {
  try {
    const { customerName, customerEmail, phone, items, note } = req.body;
    if (!customerName || !customerEmail) {
      return res
        .status(400)
        .json({ message: "Customer name and email are required" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items required" });
    }

    const menuItems = await MenuItem.find({
      _id: { $in: items.map((i) => i.menuItem) },
    });
    const itemMap = Object.fromEntries(
      menuItems.map((m) => [m._id.toString(), m])
    );

    let total = 0;
    for (const it of items) {
      const menu = itemMap[it.menuItem];
      if (!menu) return res.status(400).json({ message: "Invalid menu item" });
      const qty = it.quantity || 1;
      total += menu.price * qty;
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      phone,
      items,
      note,
      total,
      user: req.user?._id,
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.menuItem"
    );
    if (!order) return res.status(404).json({ message: "Not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const listOrders = async (req, res, next) => {
  try {
    const filter = req.query.email ? { customerEmail: req.query.email } : {};
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .populate("items.menuItem");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
