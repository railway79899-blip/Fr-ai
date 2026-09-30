const $=s=>document.querySelector(s);
const input=$("#input"),send=$("#send"),messages=$("#messages"),welcome=$("#welcome"),chatList=$("#chatList");
let chats=JSON.parse(localStorage.getItem("fr_ai_chats")||"[]"),current=null,busy=false;
const modelSelect=$("#modelSelect");
if(modelSelect&&window.FR_MODELS){
  const savedModel=localStorage.getItem("fr_ai_model")||"GPT-5.6 Luna";
  FR_MODELS.forEach(name=>{const o=document.createElement("option");o.value=name;o.textContent=name;modelSelect.appendChild(o)});
  modelSelect.value=FR_MODELS.includes(savedModel)?savedModel:FR_MODELS[0];
  modelSelect.onchange=()=>localStorage.setItem("fr_ai_model",modelSelect.value);
}

function save(){localStorage.setItem("fr_ai_chats",JSON.stringify(chats))}
function renderList(){chatList.innerHTML="";chats.forEach(c=>{const b=document.createElement("div");b.className="chat-item"+(c.id===current?.id?" active":"");b.textContent=c.title||"新聊天";b.onclick=()=>openChat(c.id);chatList.appendChild(b)})}
function newChat(){const c={id:Date.now().toString(),title:"新聊天",messages:[]};chats.unshift(c);current=c;save();renderList();renderMessages()}
function openChat(id){current=chats.find(c=>c.id===id)||current;renderList();renderMessages()}
function renderMessages(){messages.innerHTML="";welcome.style.display=current?.messages.length?"none":"";(current?.messages||[]).forEach(addMessage);scroll()}
function addMessage(m){const row=document.createElement("div");row.className="message "+m.role;const av=document.createElement("div");av.className="avatar";av.textContent=m.role==="user"?"你":"FR";const box=document.createElement("div");box.className="bubble";box.textContent=m.content;const wrap=document.createElement("div");wrap.append(box);row.append(m.role==="user"?wrap:av, m.role==="user"?av:wrap);messages.append(row)}
function scroll(){requestAnimationFrame(()=>{$(".chat").scrollTop=$(".chat").scrollHeight})}
function typing(on){if(on){const r=document.createElement("div");r.id="typing";r.className="message";r.innerHTML='<div class="avatar">FR</div><div class="bubble"><div class="typing"><i></i><i></i><i></i></div></div>';messages.append(r);scroll()}else $("#typing")?.remove()}
function demoReply(q){if(/你好|嗨|哈囉/.test(q))return"你好！我是 FR AI，很高興認識你。你可以直接問我問題，或請我協助寫程式。";if(/html|網頁|網站/.test(q))return"當然可以。FR AI 可以協助你製作 HTML、CSS、JavaScript 網頁，也可以一起設計響應式介面。";if(/介紹|fr ai/.test(q.toLowerCase()))return"FR AI v1.0 是一個人工智慧聊天介面，目前提供聊天紀錄、本機儲存、響應式設計，以及可接入後端 AI API 的架構。";return"我目前正在「Demo 模式」運作。你可以先使用聊天介面；接上 api/chat.js 與 AI 服務後，就能取得真正的模型回答。\n\n你剛才說的是： "+q}
async function ask(q){if(!current||busy)return;busy=true;send.disabled=true;current.messages.push({role:"user",content:q});if(current.title==="新聊天")current.title=q.slice(0,24);save();renderList();addMessage({role:"user",content:q});welcome.style.display="none";typing(true);
try{const res=await fetch("api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:current.messages,model:modelSelect?.value||"GPT-5.6 Luna"})});if(!res.ok)throw Error();const data=await res.json();var answer=data.reply||data.content||"AI 沒有回傳內容。"}catch(e){await new Promise(r=>setTimeout(r,500));answer=demoReply(q)}
typing(false);current.messages.push({role:"assistant",content:answer});save();addMessage({role:"assistant",content:answer});scroll();busy=false;send.disabled=false}
send.onclick=()=>{const q=input.value.trim();if(!q)return;input.value="";input.style.height="auto";ask(q)}
input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send.click()}});
input.addEventListener("input",()=>{input.style.height="auto";input.style.height=Math.min(input.scrollHeight,180)+"px"});
$("#newChat").onclick=newChat;$("#clearChats").onclick=()=>{if(confirm("確定要清除所有聊天紀錄嗎？")){chats=[];localStorage.removeItem("fr_ai_chats");newChat()}};
$("#menuBtn").onclick=()=>$("#sidebar").classList.toggle("open");
$("#themeBtn").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("fr_theme",document.body.classList.contains("light")?"light":"dark")};
document.querySelectorAll("[data-prompt]").forEach(b=>b.onclick=()=>{input.value=b.dataset.prompt;input.focus()});
if(localStorage.getItem("fr_theme")==="light")document.body.classList.add("light");
if(chats.length)current=chats[0];else newChat();renderList();renderMessages();