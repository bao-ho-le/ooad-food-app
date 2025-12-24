import { useEffect, useState } from "react";
import api from "../api/client.js";

export default function StaffPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleConfirm = async (orderId) => {
    try {
      await api.patch(`/orders/${orderId}`, { status: "preparing" });
      setSelectedOrder((prev) => ({ ...prev, status: "preparing" }));
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to confirm order");
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      await api.patch(`/orders/${orderId}`, { status: "out_for_delivery" });
      setSelectedOrder((prev) => ({ ...prev, status: "out_for_delivery" }));
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update delivery status");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Staff - Order Management</h1>
        <p className="text-sm text-gray-600">Manage customer orders</p>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
            >
              <div className="space-y-1">
                <p className="font-semibold">
                  Order #{order._id.slice(-6).toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">
                  {order.customerName} - {order.customerEmail}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "preparing"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "out_for_delivery"
                      ? "bg-green-100 text-green-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status.replace(/_/g, " ").toUpperCase()}
                </span>
              </div>
              <button
                className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                onClick={() => setSelectedOrder(order)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-xl border border-orange-100 bg-white shadow-2xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Details
                </h2>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedOrder(null)}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-4 px-6 py-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">Order ID</p>
                    <p className="text-gray-900">
                      #{selectedOrder._id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Status</p>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                        selectedOrder.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : selectedOrder.status === "preparing"
                          ? "bg-blue-100 text-blue-700"
                          : selectedOrder.status === "out_for_delivery"
                          ? "bg-green-100 text-green-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {selectedOrder.status.replace(/_/g, " ").toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Customer</p>
                    <p className="text-gray-900">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Email</p>
                    <p className="text-gray-900">{selectedOrder.customerEmail}</p>
                  </div>
                  {selectedOrder.phone && (
                    <div>
                      <p className="font-semibold text-gray-700">Phone</p>
                      <p className="text-gray-900">{selectedOrder.phone}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-700">Total</p>
                    <p className="text-gray-900 font-semibold">
                      ${selectedOrder.total?.toFixed(2)}
                    </p>
                  </div>
                </div>
                {selectedOrder.note && (
                  <div className="mt-3">
                    <p className="font-semibold text-gray-700 text-sm">Note</p>
                    <p className="text-gray-900 text-sm">{selectedOrder.note}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="mb-2 font-semibold text-gray-700">Items</p>
                <ul className="divide-y rounded-lg border">
                  {selectedOrder.items?.map((item, idx) => (
                    <li key={idx} className="flex justify-between px-4 py-3">
                      <span className="text-sm text-gray-900">
                        {item.menuItem?.name || "Item"} x {item.quantity}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        $
                        {
                          (
                            (item.menuItem?.price || 0) * item.quantity
                          ).toFixed(2)
                        }
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => handleConfirm(selectedOrder._id)}
                disabled={selectedOrder.status !== "pending"}
              >
                {selectedOrder.status === "pending"
                  ? "Confirm Order"
                  : "Confirmed"}
              </button>
              <button
                className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => handleDeliver(selectedOrder._id)}
                disabled={
                  selectedOrder.status === "pending" ||
                  selectedOrder.status === "out_for_delivery" ||
                  selectedOrder.status === "delivered"
                }
              >
                {selectedOrder.status === "out_for_delivery" ||
                selectedOrder.status === "delivered"
                  ? "Delivered"
                  : "Mark as Out for Delivery"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
