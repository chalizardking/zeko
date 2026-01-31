# Eko Swarm Extension

## What This Is

A multi-agent swarm browser extension built on the Eko framework, featuring a vertical sidebar UI inspired by osaurus. It enables real-time visual tracking of agent reasoning and task execution while providing powerful browser automation and MCP-based tool extensibility.

## Core Value

The seamless orchestration and visual tracking of a multi-agent swarm performing complex browser-based tasks.

## Requirements

### Validated

- ✓ Layered monorepo architecture with `@eko-ai/eko-core` — existing
- ✓ Basic browser automation services (Playwright/DOM) — existing
- ✓ MCP client implementations (SSE/HTTP) — existing
- ✓ ReAct reasoning loop implementation — existing
- ✓ Core framework multi-platform support — existing

### Active

- [ ] Vertical sidebar UI with osaurus-inspired sleek panel design
- [ ] Real-time visual tracking of multi-agent swarm "thinking" and status
- [ ] Integration of powerful browser automation skills into swarm agents
- [ ] Native support for MCP tools within the extension environment
- [ ] Specialized domain tools (Web search, data extraction) for agents

### Out of Scope

- Multi-Browser Support — initially focused on Chrome/Manifest V3 compatibility
- Complex Authentication Flows — deferred to future versions to focus on swarm logic
- Offline Agent Execution — requires active LLM provider connection

## Context

- Building on the existing `eko` monorepo codebase.
- Utilizes the Vercel AI SDK for unified LLM provider access.
- Requires strict adherence to Chrome Extension Manifest V3 security and runtime limits.
- UI inspiration: `osaurus` sleek, vertical side-panel approach.

## Constraints

- **Compatibility**: Must be fully compatible with existing `@eko-ai` packages — ecosystem consistency.
- **Manifest V3**: Extension must adhere to Chrome Manifest V3 requirements — compliance for distribution.
- **Runtime Limits**: Must optimize for the performance and memory constraints of the browser extension environment — stability.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| osaurus-inspired Side-Panel | Provides the best visual density for tracking multiple agents in a browser context | — Pending |
| Eko Framework Base | Leverages existing production-ready agentic primitives and multi-platform support | — Pending |
| Swarm Coordination Focus | Prioritizing delegation and orchestration as the primary value proposition | — Pending |

---
*Last updated: 2026-01-30 after initialization*
