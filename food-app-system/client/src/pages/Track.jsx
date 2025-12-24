import { useEffect, useState } from "react";
import api from "../api/client.js";
import OrderStatus from "../components/OrderStatus.jsx";

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [searchedId, setSearchedId] = useState("");

  useEffect(() => {
    if (!searchedId) return;
    const timer = setInterval(() => {
      fetchOrder(searchedId, false);
    }, 8000);
    return () => clearInterval(timer);
  }, [searchedId]);

  const fetchOrder = async (id, showError = true) => {
    const cleanId = id.trim().replace(/^#/, "");
    if (!cleanId) {
      if (showError) setError("Please enter an order ID");
      setOrder(null);
      return;
    }

    try {
      console.log("Fetching order with ID:", cleanId);
      const res = await api.get(`/orders/${cleanId}`);
      console.log("Order response:", res.data);
      setOrder(res.data);
      setError("");
    } catch (err) {
      console.error("Fetch order error:", err);
      console.error("Error response:", err.response?.data);
      if (showError) {
        setError(err.response?.data?.message || "Order not found");
      }
      setOrder(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId) return;
    const cleanId = orderId.trim().replace(/^#/, "");
    setSearchedId(cleanId);
    fetchOrder(cleanId);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Track your order</h1>
        <p className="text-sm text-gray-600">
          Enter your order ID (e.g., #32BF63 or full ID).
        </p>
      </div>

      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-md border px-3 py-2"
          placeholder="Order ID (e.g., #32BF63 or full ID)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-orange-600 px-4 py-2 text-white font-semibold hover:bg-orange-700"
        >
          Track
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <OrderStatus order={order} />
    </div>
  );
}
