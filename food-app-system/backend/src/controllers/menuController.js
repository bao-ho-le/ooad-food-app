import MenuItem from "../models/MenuItem.js";

export const getMenu = async (_req, res, next) => {
  try {
    const items = await MenuItem.find({ isAvailable: true }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
};
