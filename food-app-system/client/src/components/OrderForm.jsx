import { useState } from "react";

export default function OrderForm({ items, onSubmit, loading }) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!items.length) return;
    onSubmit({ customerName, customerEmail, phone, note });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="text-gray-700">Name</span>
          <input
            required
            className="w-full rounded-md border px-3 py-2"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-gray-700">Email</span>
          <input
            required
            type="email"
            className="w-full rounded-md border px-3 py-2"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-gray-700">Phone</span>
          <input
            className="w-full rounded-md border px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="space-y-1 text-sm sm:col-span-2">
          <span className="text-gray-700">Note</span>
          <textarea
            className="w-full rounded-md border px-3 py-2"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-gray-700">Order items</h4>
        {!items.length && (
          <p className="text-sm text-gray-500">No items added.</p>
        )}
        <ul className="divide-y text-sm">
          {items.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between py-2"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-2 text-sm font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !items.length}
        className="w-full rounded-md bg-orange-600 px-4 py-2 text-white font-semibold hover:bg-orange-700"
      >
        {loading ? "Submitting..." : "Place order"}
      </button>
    </form>
  );
}
