# Roadmap: Eko Swarm Extension

## Overview

A 10-phase journey to build a multi-agent swarm browser extension with a polished vertical sidebar UI. The project moves from foundational scaffolding and Eko integration to complex swarm orchestration, real-time visualization, and secure tool extensibility via MCP.

## Domain Expertise

- ~/.claude/skills/expertise/ui-design/SKILL.md
- ~/.claude/skills/expertise/with-agent-sdk/SKILL.md

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Project Scaffolding** - Set up development environment, Manifest V3 base, and workspace links.
- [x] **Phase 2: Eko Integration** - Integrate `@eko-ai/eko-core` and configure for extension runtime.
- [x] **Phase 3: Sidebar Shell** - Implement the basic vertical sidebar UI shell inspired by `osaurus`.
- [x] **Phase 4: Swarm Orchestrator** - Implement multi-agent coordination and task delegation logic.
- [ ] **Phase 5: Agent Visualizer** - Build real-time tracking for agent "thinking" and status in the sidebar.
- [ ] **Phase 6: Browser Interaction Layer** - Implement and optimize DOM-based automation tools.
- [ ] **Phase 7: MCP Integration** - Add support for external tools via Model Context Protocol.
- [ ] **Phase 8: Specialized Agent Skills** - Implement web search and data extraction tools for the swarm.
- [ ] **Phase 9: Security & Redaction** - Implement PII redaction and secure API key management.
- [ ] **Phase 10: Refinement & Polish** - Final UX polish, error handling improvements, and documentation.

## Phase Details

### Phase 1: Project Scaffolding
**Goal**: Establish a working Manifest V3 extension structure within the monorepo.
**Depends on**: Nothing (first phase)
**Research**: Unlikely (standard monorepo setup)
**Plans**: 2 plans

Plans:
- [x] 01-01: Set up new workspace package `packages/eko-swarm-extension`
- [x] 01-02: Configure build system (Rollup) and basic Manifest V3 files

### Phase 2: Eko Integration
**Goal**: Successfully run a basic Eko agent inside the extension service worker.
**Depends on**: Phase 1
**Research**: Likely (runtime compatibility)
**Research topics**: Eko runtime requirements in Service Workers, polyfills needed
**Plans**: 3 plans

Plans:
- [x] 02-01: Integrate `@eko-ai/eko-core` dependency
- [x] 02-02: Create background service worker agent host
- [x] 02-03: Verify basic agent execution (ping/pong)

### Phase 3: Sidebar Shell
**Goal**: A functional, styled sidebar UI that can communicate with the background script.
**Depends on**: Phase 2
**Research**: Unlikely (standard React/Tailwind)
**Plans**: 3 plans

Plans:
- [x] 03-01: Set up React + Tailwind in sidebar context
- [x] 03-02: Implement basic vertical layout structure
- [x] 03-03: Establish message passing bridge (Sidebar <-> Background)

### Phase 4: Swarm Orchestrator
**Goal**: Core logic for managing multiple concurrent agents and delegation.
**Depends on**: Phase 3
**Research**: Likely (swarm architecture)
**Research topics**: Task delegation patterns in Eko, state synchronization
**Plans**: 4 plans

Plans:
- [x] 04-01: Define Swarm and Agent interfaces
- [x] 04-02: Implement task decomposition logic
- [x] 04-03: Implement agent state management
- [x] 04-04: Build delegation message router

### Phase 5: Agent Visualizer
**Goal**: Visualize agent states, logs, and "thinking" processes in the UI.
**Depends on**: Phase 4
**Research**: Unlikely (UI implementation)
**Plans**: 3 plans

Plans:
- [ ] 05-01: Create Agent Profile components
- [ ] 05-02: Implement real-time activity log/terminal
- [ ] 05-03: Connect UI to live swarm state updates

### Phase 6: Browser Interaction Layer
**Goal**: Enable agents to read and interact with the active tab DOM safely.
**Depends on**: Phase 5
**Research**: Likely (DOM security)
**Research topics**: Content script injection patterns, isolation worlds
**Plans**: 3 plans

Plans:
- [ ] 06-01: Create DOM interaction content scripts
- [ ] 06-02: Build `BrowserService` bridge for the extension
- [ ] 06-03: Implement element highlighting/visual feedback

### Phase 7: MCP Integration
**Goal**: Connect agents to external tools via MCP (Model Context Protocol).
**Depends on**: Phase 6
**Research**: Likely (MCP over Chrome messaging)
**Research topics**: MCP transport implementation for browser extensions
**Plans**: 3 plans

Plans:
- [ ] 07-01: Implement MCP Client in background script
- [ ] 07-02: Create tool registry and discovery UI
- [ ] 07-03: Connect MCP tools to agent context

### Phase 8: Specialized Agent Skills
**Goal**: Equip agents with specific capabilities like search and extraction.
**Depends on**: Phase 7
**Research**: Unlikely (Eko/MCP tool implementation)
**Plans**: 2 plans

Plans:
- [ ] 08-01: Implement Web Search agent skill
- [ ] 08-02: Implement Data Extraction agent skill

### Phase 9: Security & Redaction
**Goal**: Ensure user data safety with PII redaction and secure key storage.
**Depends on**: Phase 8
**Research**: Likely (PII detection patterns)
**Research topics**: Client-side PII scrubbing libraries, secure storage API
**Plans**: 3 plans

Plans:
- [ ] 09-01: Implement API Key secure storage (proxy pattern)
- [ ] 09-02: Add PII redaction layer to DOM content
- [ ] 09-03: Security audit and cleanup

### Phase 10: Refinement & Polish
**Goal**: Production-ready UX, error handling, and performance tuning.
**Depends on**: Phase 9
**Research**: Unlikely (polish)
**Plans**: 3 plans

Plans:
- [ ] 10-01: Global error boundaries and recovery
- [ ] 10-02: Performance optimization (memory/CPU)
- [ ] 10-03: Final UI polish and animations

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Scaffolding | 2/2 | Completed | 2026-01-30 |
| 2. Eko Integration | 3/3 | Completed | 2026-01-30 |
| 3. Sidebar Shell | 3/3 | Completed | 2026-01-30 |
| 4. Swarm Orchestrator | 4/4 | Completed | 2026-01-30 |
| 5. Agent Visualizer | 0/3 | Not started | - |
| 6. Browser Interaction Layer | 0/3 | Not started | - |
| 7. MCP Integration | 0/3 | Not started | - |
| 8. Specialized Agent Skills | 0/2 | Not started | - |
| 9. Security & Redaction | 0/3 | Not started | - |
| 10. Refinement & Polish | 0/3 | Not started | - |
