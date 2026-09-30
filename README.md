# FR AI v1.0

FR AI 是一個繁體中文優先的人工智慧聊天介面，現在可接入 Pollinations AI。

## v1.0 功能
- ChatGPT 風格聊天 UI
- 深色藍色 Glassmorphism
- 新增聊天與聊天紀錄
- localStorage 儲存聊天
- 手機 / iPad / 桌面響應式
- Enter 送出、Shift+Enter 換行
- Demo 模式（API 未設定時）
- Pollinations AI Serverless API
- API Key 不放在前端

## Pollinations AI 設定

Pollinations 提供 OpenAI-compatible Chat Completions API。

請先在 Pollinations Dashboard 建立或取得 API Key：
https://enter.pollinations.ai/keys

部署 `api/chat.js` 的平台請設定環境變數：

```
POLLINATIONS_API_KEY=你的sk_金鑰
POLLINATIONS_MODEL=openai/gpt-5.4-nano
```

API Key **不要**貼進 `index.html`、`app.js` 或公開 GitHub 程式碼。

FR AI 後端會呼叫：

```
https://gen.pollinations.ai/v1/chat/completions
```

## 使用

直接開啟 `index.html` 可以看到 FR AI 介面。

若要使用真正 AI 回覆，請把專案部署到支援 Serverless Functions 的平台，並設定上面的環境變數。

## 專案

FR AI v1.0 · railway79899-blip/Fr-ai
