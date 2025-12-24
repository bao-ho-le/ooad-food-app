import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import MenuItem from "../src/models/MenuItem.js";
import connectDB from "../src/config/db.js";

const items = [
  {
    name: "Margherita Pizza",
    description: "Classic with mozzarella & basil",
    price: 9.5,
    imageUrl: "https://images.unsplash.com/photo-1601924582971-d6653160c3b3",
    category: "Pizza",
  },
  {
    name: "Cheeseburger",
    description: "Beef patty, cheddar, pickles",
    price: 8,
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    category: "Burgers",
  },
  {
    name: "Caesar Salad",
    description: "Romaine, parmesan, croutons",
    price: 7,
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710",
    category: "Salad",
  },
];

(async () => {
  try {
    await connectDB();
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(items);
    console.log("Menu seeded");
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
