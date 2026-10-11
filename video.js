export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({ error: 'Use POST' });
  const { idea } = req.body;

  const prompt = `You are a viral video script writer. Idea: ${idea}.
  Write a 30-second video script in 5 scenes.
  For each scene give:
    1. Visual description (for image generation)
    2. Voiceover line
    3. Action

  Return as JSON like: {"title":"...", "scenes":[{"scene":1,"visual":"...","voiceover":"...","action":"..."}]}`;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      })
    });
    const data = await openaiRes.json();
    const script = data.choices[0].message.content;
    return res.status(200).json({ script: script });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}