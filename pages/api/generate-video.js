export default function handler(req, res) {
  const pitch = req.body?.pitch || "En AI som hjälper entreprenörer";
  const videoUrl = "https://mocked-video-host.com/startpilot/" + encodeURIComponent(pitch.toLowerCase().replace(/ /g, "-"));
  res.status(200).json({
    success: true,
    videoUrl,
    message: "Video generated successfully (mock)"
  });
}
