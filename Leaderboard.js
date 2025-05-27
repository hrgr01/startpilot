import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/mock-leaderboard")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">🏆 Referral Leaderboard</h2>
      <ol className="list-decimal ml-4 space-y-1">
        {data.map((user, i) => (
          <li key={i}>
            {user.name} – {user.points} poäng
          </li>
        ))}
      </ol>
    </div>
  );
}
