import crypto from "crypto";

function parseCookie(req){
  const raw=req.headers.cookie||"";
  return Object.fromEntries(raw.split(";").map(x=>x.trim().split("=").map(decodeURIComponent)).filter(x=>x.length===2));
}
function valid(req){
  const token=parseCookie(req).fr_admin_session||"";
  const [payload,sig]=token.split(".");
  if(!payload||!sig||!process.env.ADMIN_SESSION_SECRET) return false;
  const expected=crypto.createHmac("sha256",process.env.ADMIN_SESSION_SECRET).update(payload).digest("hex");
  if(!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected))) return false;
  const data=JSON.parse(Buffer.from(payload,"base64url").toString());
  return Date.now()-data.t<8*60*60*1000;
}
export default async function handler(req,res){
  if(!valid(req)) return res.status(401).json({error:"未登入管理員帳號"});
  if(req.method==="GET"){
    return res.status(200).json({
      username:process.env.ADMIN_USERNAME||"Fradmin79899",
      configured:!!process.env.POLLINATIONS_API_KEY,
      model:process.env.POLLINATIONS_MODEL||"openai/gpt-5.4-nano"
    });
  }
  if(req.method==="POST"){
    const {apiKey,model}=req.body||{};
    // Serverless functions cannot safely persist arbitrary new secrets to process.env.
    // Use this endpoint to validate/administer deployment configuration only.
    // The API key is deliberately not written to source control or returned to the browser.
    if(apiKey && !apiKey.startsWith("sk_")) return res.status(400).json({error:"Pollinations Secret Key 格式不正確"});
    return res.status(200).json({
      ok:true,
      configured:!!(apiKey||process.env.POLLINATIONS_API_KEY),
      model:model||process.env.POLLINATIONS_MODEL||"openai/gpt-5.4-nano",
      message:"目前部署環境的 Secret 需透過 Vercel Environment Variables 持久設定。"
    });
  }
  return res.status(405).json({error:"Method not allowed"});
}