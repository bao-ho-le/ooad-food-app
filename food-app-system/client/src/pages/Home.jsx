import { useEffect, useState } from "react";
import api from "../api/client.js";
import MenuGrid from "../components/MenuGrid.jsx";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Today’s menu</h1>
        <p className="text-sm text-gray-600">Browse and pick your favorites.</p>
      </div>
      {loading ? <p>Loading...</p> : <MenuGrid items={items} />}
    </div>
  );
}
