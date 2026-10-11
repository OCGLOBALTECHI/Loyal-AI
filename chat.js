export default async function handler(req, res){
 const { prompt } = req.body;
 const resp = await fetch("https://api.openai.com/v1/chat/completions", {
  method:"POST",
  headers:{
   "Content-Type":"application/json",
   "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
  },
  body: JSON.stringify({
   model:"gpt-4o-mini",
   messages:[{role:"user", content: prompt}]
  })
 });
 const data = await resp.json();
 res.json({answer: data.choices?.[0]?.message?.content || "Error: "+JSON.stringify(data)});
}