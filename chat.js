export default async function handler(req, res){
  if(req.method!== 'POST') return res.status(405).json({error:'POST only'});
  const { prompt } = req.body;
  try{
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model:"gpt-4o-mini",
        messages:[{role:"system",content:"You are LOYAL AI, helpful assistant by OCGLOBALTECH Port Harcourt."},{role:"user",content:prompt}]
      })
    });
    const data = await r.json();
    if(data.error) return res.json({answer:"OpenAI Error: "+data.error.message});
    res.json({answer:data.choices[0].message.content});
  }catch(e){
    res.json({answer:"Server Error: "+e.message});
  }
}