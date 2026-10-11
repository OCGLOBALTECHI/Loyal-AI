export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({ error: 'Use POST' });
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'No prompt' });

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      })
    });
    const data = await openaiRes.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    return res.status(200).json({ imageUrl: data.data[0].url });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}