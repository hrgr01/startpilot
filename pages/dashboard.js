// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
        fetchPackages(session.user.email);
      }
    };
    getSession();
  }, []);

  const fetchPackages = async (email) => {
    const { data, error } = await supabase
      .from("packages")
      .select("id, idea, name, pitch, product, created_at")
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fel vid hämtning av paket:", error);
    } else {
      setPackages(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        <p>Laddar din dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-6">📁 Mina AI-paket</h1>
      {packages.length === 0 ? (
        <p>Du har inte skapat några AI-paket ännu.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-[#1e293b] p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-2">💡 {pkg.idea}</h2>
              <p><strong>📛 Namn:</strong> {pkg.name}</p>
              <p><strong>📦 Produkt:</strong> {pkg.product}</p>
              <p><strong>🎤 Pitch:</strong> {pkg.pitch}</p>
              <p className="text-sm text-gray-400 mt-2">🕒 {new Date(pkg.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
