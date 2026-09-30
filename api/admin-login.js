import crypto from "crypto";

function cookie(name,value,maxAge){
  return name+"="+encodeURIComponent(value)+"; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age="+maxAge;
}
function sign(value){
  return crypto.createHmac("sha256",process.env.ADMIN_SESSION_SECRET||"").update(value).digest("hex");
}
export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  const {username,password}=req.body||{};
  const expectedUser=process.env.ADMIN_USERNAME||"Fradmin79899";
  const expectedPass=process.env.ADMIN_PASSWORD;
  if(!expectedPass) return res.status(503).json({error:"ADMIN_PASSWORD is not configured"});
  if(username!==expectedUser || password!==expectedPass) return res.status(401).json({error:"帳號或密碼錯誤"});
  const payload=Buffer.from(JSON.stringify({u:expectedUser,t:Date.now()})).toString("base64url");
  const token=payload+"."+sign(payload);
  res.setHeader("Set-Cookie",cookie("fr_admin_session",token,60*60*8));
  return res.status(200).json({ok:true});
}