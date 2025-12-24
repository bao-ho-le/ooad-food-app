import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client.js";
import MenuGrid from "../components/MenuGrid.jsx";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/menu");
        setItems(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addToStoredCart = (item) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    const found = existing.find((i) => i._id === item._id);
    if (found) {
      found.quantity += 1;
    } else {
      existing.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(existing));
  };

  const handleAdd = (item) => {
    addToStoredCart(item);
    setShowConfirm(true);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Today’s menu</h1>
        <p className="text-sm text-gray-600">Browse and pick your favorites.</p>
      </div>
      {loading ? <p>Loading...</p> : <MenuGrid items={items} onAdd={handleAdd} />}

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-orange-100 bg-white shadow-2xl">
            <div className="flex items-start gap-3 px-5 py-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-700">
                ✓
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">Added to your order</h3>
                <p className="text-sm text-gray-600">
                  Would you like to go to order page?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-5 pb-5">
              <button
                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
              <button
                className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
                onClick={() => {
                  setShowConfirm(false);
                  navigate("/order");
                }}
              >
                Yes, go to Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
