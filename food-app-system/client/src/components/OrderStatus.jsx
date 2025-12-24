export default function OrderStatus({ order }) {
  if (!order) return null;
  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="font-semibold">{order._id}</p>
        </div>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 uppercase">
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
