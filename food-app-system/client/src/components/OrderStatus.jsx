export default function OrderStatus({ order }) {
  if (!order || !order.status) return null;
  const shortId = order._id ? `#${order._id.slice(-6).toUpperCase()}` : "—";
  const statusClasses =
    order.status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : order.status === "preparing"
      ? "bg-blue-100 text-blue-700"
      : order.status === "out_for_delivery"
      ? "bg-green-100 text-green-700"
      : "bg-green-100 text-green-700";
  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="font-semibold">{shortId}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusClasses}`}>
          {order.status.replace(/_/g, " ")}
        </span>
      </div>
      <div className="space-y-1 text-sm text-gray-700">
        <p>
          Customer: {order.customerName} ({order.customerEmail})
        </p>
        <p>Total: ${order.total?.toFixed(2)}</p>
      </div>
      <div className="text-sm text-gray-700">
        <p className="font-semibold">Items</p>
        <ul className="list-disc pl-5">
          {order.items?.map((it) => (
            <li key={it.menuItem?._id || it.menuItem}>
              {it.menuItem?.name || "Item"} x {it.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
