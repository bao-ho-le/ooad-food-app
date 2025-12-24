import { useEffect, useMemo, useState } from "react";
import api from "../api/client.js";
import MenuGrid from "../components/MenuGrid.jsx";
import OrderForm from "../components/OrderForm.jsx";

export default function OrderPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/menu");
      setMenu(res.data);
    };
    load();
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    if (stored.length) setCart(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i._id === item._id);
      if (found) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const cartPayload = useMemo(
    () =>
      cart.map((i) => ({
        menuItem: i._id,
        quantity: i.quantity,
        price: i.price,
        name: i.name,
      })),
    [cart]
  );

  const submitOrder = async ({ customerName, customerEmail, phone, note }) => {
    setLoading(true);
    try {
      const res = await api.post("/orders", {
        customerName,
        customerEmail,
        phone,
        note,
        items: cartPayload,
      });
      setOrderId(res.data._id);
      setCart([]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Menu</h2>
          <span className="text-sm text-gray-600">Click to add</span>
        </div>
        <MenuGrid items={menu} onAdd={addToCart} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your order</h2>
        <OrderForm items={cart} onSubmit={submitOrder} loading={loading} />
        {orderId && (
          <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Order placed! Track it with ID:{" "}
            <span className="font-semibold">
              #{orderId.slice(-6).toUpperCase()}
            </span>
            <div className="mt-2 text-xs text-green-700">
              Full ID (for tracking): <code className="rounded bg-green-100 px-1">{orderId}</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
