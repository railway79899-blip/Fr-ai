# FR AI v1.0

FR AI 是一個繁體中文優先的人工智慧聊天介面。

## v1.0 功能
- ChatGPT 風格聊天 UI
- 深色藍色 Glassmorphism
- 新增聊天與聊天紀錄
- localStorage 儲存聊天
- 手機 / iPad / 桌面響應式
- Enter 送出、Shift+Enter 換行
- Demo 模式
- Serverless AI API 介面
- API Key 不放在前端

## 使用
直接開啟 `index.html` 即可使用 Demo 模式。

要接真正 AI，請將 `api/chat.js` 部署到支援 Serverless Functions 的平台，並設定：

```
AI_API_KEY=你的API金鑰
AI_MODEL=你的模型
AI_API_URL=你的API端點
```

請勿把 API 金鑰直接寫進 `app.js` 或 `index.html`。

## 專案
FR AI v1.0 · railway79899-blip/Fr-ai
