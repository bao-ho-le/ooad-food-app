import { useEffect, useState } from "react";
import api from "../api/client.js";
import OrderStatus from "../components/OrderStatus.jsx";

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!order?._id) return;
    const timer = setInterval(() => {
      fetchOrder(order._id, false);
    }, 8000);
    return () => clearInterval(timer);
  }, [order?._id]);

  const fetchOrder = async (id, showError = true) => {
    try {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data);
      setError("");
    } catch (err) {
      if (showError) setError("Order not found");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId) return;
    fetchOrder(orderId);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Track your order</h1>
        <p className="text-sm text-gray-600">
          Enter the order ID you received after checkout.
        </p>
      </div>

      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-md border px-3 py-2"
          placeholder="Order ID"
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
