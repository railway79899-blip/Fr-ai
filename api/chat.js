// FR AI v1.0 — Pollinations AI adapter
// The secret key must stay in the server environment.
// Do NOT put POLLINATIONS_API_KEY in index.html or app.js.

export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});

  try{
    const {messages=[]}=req.body||{};
    const key=process.env.POLLINATIONS_API_KEY;

    if(!key){
      return res.status(503).json({
        error:"POLLINATIONS_API_KEY is not configured"
      });
    }

    const response=await fetch("https://gen.pollinations.ai/v1/chat/completions",{
      method:"POST",
      headers:{
        "Authorization":"Bearer "+key,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model:process.env.POLLINATIONS_MODEL||"openai/gpt-5.4-nano",
        messages:[
          {
            role:"system",
            content:"你是 FR AI，一個繁體中文優先的人工智慧助手。請清楚、友善、實用地回答使用者。"
          },
          ...messages
        ],
        stream:false
      })
    });

    const data=await response.json();

    if(!response.ok){
      return res.status(response.status).json({
        error:data?.error?.message||data?.error||"Pollinations API request failed"
      });
    }

    const reply=data?.choices?.[0]?.message?.content||"";
    return res.status(200).json({reply});
  }catch(error){
    return res.status(500).json({
      error:error?.message||"Server error"
    });
  }
}
