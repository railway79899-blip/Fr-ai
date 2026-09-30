const form=document.getElementById("loginForm");
const message=document.getElementById("loginMessage");
form?.addEventListener("submit",async e=>{
  e.preventDefault();
  message.textContent="目前 FR Account 登入介面已建立；正式帳號驗證需要連接後端身份驗證服務。";
  message.className="auth-message info";
});