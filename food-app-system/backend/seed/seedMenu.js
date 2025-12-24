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
    imageUrl: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=400&h=300&fit=crop",
    category: "Pizza",
  },
  {
    name: "Cheeseburger",
    description: "Beef patty, cheddar, pickles",
    price: 8,
    imageUrl: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?w=400&h=300&fit=crop",
    category: "Burgers",
  },
  {
    name: "Caesar Salad",
    description: "Romaine, parmesan, croutons",
    price: 7,
    imageUrl: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop",
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
