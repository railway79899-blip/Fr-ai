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

## Vercel 部署

1. 在 Vercel 匯入此 GitHub repository。
2. Framework Preset 選擇 **Other**（或讓 Vercel 自動偵測）。
3. Build Command 留空。
4. Output Directory 留空。
5. 在 **Environment Variables** 加入：
   - `POLLINATIONS_API_KEY` = 你在 Pollinations 建立的新 Secret Key
   - `POLLINATIONS_MODEL` = `openai/gpt-5.4-nano`
6. 部署後開啟網站，送出訊息測試。

### 重要安全提醒

先前貼出的 Secret Key 應視為已曝光，請在 Pollinations 後台撤銷並重新建立新的 Key。新的 Key 只放 Vercel Environment Variables，不要提交到 GitHub。

Vercel 部署需要環境變數才能使用真正的 Pollinations AI；沒有 Key 時，前端會回到 Demo 回覆模式。
