import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);

  const login = () => {
    if (password === "adminstart") {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Fel vid hämtning av data:", error.message);
    } else {
      setOrders(data);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl mb-4 font-bold">Admin Login</h1>
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Lösenord"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 rounded" onClick={login}>
          Logga in
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📊 Adminpanel</h1>
      {orders.length === 0 ? (
        <p>Inga inskick ännu.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Idé</th>
              <th className="p-2 text-left">Referral</th>
              <th className="p-2 text-left">Datum</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.idea}</td>
                <td className="p-2">{order.refBy || "-"}</td>
                <td className="p-2">{new Date(order.created_at).toLocaleString("sv-SE")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
