# Instructions for Coding Assistants

## Project Overview

This repository is a trimmed student Web-Agent monorepo. It keeps the single-page
agent pipeline needed for the course project:

- **Page Controller** (`packages/page-controller/`) extracts interactive elements,
  assigns indexes, highlights targets, and executes DOM actions.
- **LLMs** (`packages/llms/`) calls an OpenAI-compatible model endpoint.
- **Core** (`packages/core/`) runs the multi-step agent loop and maps model actions
  to controller tools.
- **UI** (`packages/ui/`) provides a lightweight panel for local demos.
- **Page Agent** (`packages/page-agent/`) wires the controller, core, and UI together.
- **Extension** (`packages/extension/`) runs the agent inside arbitrary browser tabs.

Removed product-facing parts include the website, MCP server, publishing scripts,
and project governance docs.

## Development Commands

```bash
npm start
npm run build
npm run build:libs
npm run dev:ext
npm run build:ext
npm run typecheck
npm run lint
```

## Architecture

```
packages/
├── page-controller/  # DOM extraction, element indexes, actions, visual feedback
├── ui/               # Demo panel and i18n
├── llms/             # Model client
├── core/             # Agent loop and tools
├── page-agent/       # Main browser entry
└── extension/        # Browser extension for arbitrary websites
```

`workspaces` in `package.json` should remain in dependency order.

## Student Project Scope

### Direction A: Page State Understanding

- Extract visible interactive elements.
- Assign each element a stable index for the current page state.
- Preserve useful labels such as text, placeholder, aria-label, value, and role.
- Provide bounding boxes for visualization and evaluation.
- Keep the output concise enough for an LLM to consume.

### Direction B: LLM Action Decision

- Keep the action space small: `click`, `input`, `scroll`, `wait`, and `done`.
- Use structured model output and reject invalid actions clearly.
- Record every step in the agent history.

### Direction C: Evaluation and Tool Extension

- Add local task pages and task configs outside the core packages.
- Save page state, actions, screenshots, and final results under `runs/`.
- Add custom tools only when they support course demos or evaluation.

## Code Standards

- Public APIs need explicit TypeScript types.
- All code and comments must be in English.
- Do not hide errors; make failures visible and actionable.
- Prefer traceable, predictable behavior over silently increasing success rate.
- Keep changes scoped to the student Web-Agent pipeline.
