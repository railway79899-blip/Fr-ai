// FR AI v1.0 API adapter
// Deploy this endpoint on a serverless platform (e.g. Vercel).
// Keep your AI API key in environment variables, never in the browser.
export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  try{
    const {messages=[]}=req.body||{};
    const key=process.env.AI_API_KEY;
    if(!key) return res.status(503).json({error:"AI_API_KEY is not configured"});
    // Replace the provider request below with your chosen AI provider.
    const r=await fetch(process.env.AI_API_URL||"https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization:"Bearer "+key},
      body:JSON.stringify({model:process.env.AI_MODEL||"gpt-4o-mini",messages})
    });
    const data=await r.json();
    if(!r.ok) return res.status(r.status).json({error:data.error?.message||"AI request failed"});
    return res.status(200).json({reply:data.choices?.[0]?.message?.content||""});
  }catch(e){return res.status(500).json({error:e.message||"Server error"});}
}