import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import OrderPage from "./pages/Order.jsx";
import TrackPage from "./pages/Track.jsx";
import StaffPage from "./pages/Staff.jsx";

function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-semibold text-orange-600">
            Food App
          </Link>
          <nav className="flex gap-4 text-sm font-medium">
            <Link className="hover:text-orange-600" to="/">
              Home
            </Link>
            <Link className="hover:text-orange-600" to="/order">
              Order
            </Link>
            <Link className="hover:text-orange-600" to="/track">
              Track
            </Link>
            <Link className="hover:text-orange-600" to="/staff">
              Staff
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/staff" element={<StaffPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
