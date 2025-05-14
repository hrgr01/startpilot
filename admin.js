import { useState } from "react";

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([
    { name: "Anna", package: "Pro", idea: "AI för hundägare", date: "2025-05-10" },
    { name: "Max", package: "Creator", idea: "AI-fitnesscoach", date: "2025-05-12" },
  ]);

  const login = () => {
    if (password === "adminstart") setIsLoggedIn(true);
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
        <button className="bg-black text-white px-4 py-2 rounded" onClick={login}>Logga in</button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📊 Adminpanel</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Namn</th>
            <th className="p-2 text-left">Paket</th>
            <th className="p-2 text-left">Idé</th>
            <th className="p-2 text-left">Datum</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{o.name}</td>
              <td className="p-2">{o.package}</td>
              <td className="p-2">{o.idea}</td>
              <td className="p-2">{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
