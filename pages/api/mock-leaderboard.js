export default function handler(req, res) {
  res.status(200).json([
    { name: "Anna", points: 120 },
    { name: "David", points: 85 },
    { name: "Zara", points: 75 }
  ]);
}
