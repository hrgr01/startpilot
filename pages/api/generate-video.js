export default async function handler(req, res) {
  const { pitch } = req.body;

  // Här ska du senare koppla in Pika Labs eller Runway via webhook eller API
  const demoLink = "https://cdn.startpilot.org/demo-video.mp4";

  res.status(200).json({
    message: "Video genererad baserat på din pitch",
    videoUrl: demoLink
  });
}
