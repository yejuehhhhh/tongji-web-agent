# Student Web-Agent

This is a trimmed course-project version of a Web-Agent system. It focuses on a
single-page browser agent that can read webpage state, ask an LLM for the next
action, execute indexed DOM operations, and record the process for demos or
evaluation.


## Course Module Mapping

| Direction | Responsibility | Main Package |
| --- | --- | --- |
| A | Extract interactive elements, indexes, labels, and positions | `packages/page-controller` |
| B | Decide actions with an LLM and run the agent loop | `packages/core`, `packages/llms` |
| C | Build task sets, logs, result saving, and evaluation scripts | add under `tasks/`, `runs/`, or `evaluation/` |

## Commands

```bash
npm install
npm run demo
npm run build
npm run typecheck
npm run lint
```

## Run the Full Web-Agent Demo

Create a local `.env` file first:

```bash
cp .env.example .env
```

Edit `.env` with an OpenAI-compatible model endpoint:

```bash
LLM_MODEL_NAME=gpt-4o-mini
LLM_BASE_URL=https://api.openai.com/v1
LLM_API_KEY=your-api-key
```

Start the local demo:

```bash
npm run demo
```

Open:

```text
http://localhost:5174
```

The page loads a local search form and injects the Web-Agent panel. Try this task
in the panel:

```text
请在搜索框输入 browser-use，并点击搜索按钮
```

The expected flow is:

```text
extract page elements -> ask the model for the next action -> input text ->
click the search button -> observe the result -> finish
```

For Direction A only, API access is not required. Open the browser console and run:

```js
await window.pageAgent.pageController.getElementStateJson()
await window.pageAgent.pageController.drawElementStateOverlay()
```

## Run on Any Website With the Browser Extension

Use the extension when the demo target is an arbitrary website. This avoids iframe
and cross-origin restrictions because the agent runs in the active browser tab.

Start the extension in development mode:

```bash
npm run dev:ext
```

WXT opens a Chromium profile with the extension installed. In that browser:

1. Open any target website.
2. Click the extension icon or open the side panel.
3. Configure the model:

```text
Base URL: https://api.deepseek.com
Model: deepseek-v4-pro
API Key: your DeepSeek API key
Response Language: 中文
```

4. Enter a natural-language task, for example:

```text
请在当前网站搜索 browser-use
```

Build the extension package:

```bash
npm run build:ext
```

The built extension is in:

```text
packages/extension/.output/chrome-mv3
```

## Development Notes

The repository uses source-first workspace exports, so packages import sibling
source files directly during development. Keep the workspace order in
`package.json` aligned with package dependencies.
