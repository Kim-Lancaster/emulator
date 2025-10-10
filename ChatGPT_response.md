Here’s a crisp, no-code plan you can hand to a team (or your future self) to build a Flutter “terminal client” that talks to a tiny server app on your laptop/desktop which spins up and manages a `ttyd` backend for OpenCode.

# 1) Goals & constraints

* **Use case:** From phone, open a fast, resilient terminal session into your laptop to run OpenCode’s TUI.
* **Two deliverables:**

  1. **Flutter mobile app** (iOS/Android).
  2. **Server CLI** (Linux/macOS) that installs/configures `ttyd`, launches persistent sessions, and exposes connection metadata.
* **Assumptions:** Same LAN or reachable via VPN (e.g., WireGuard).
* **Must-haves:** Multiple tabs, persistent sessions, quick connect, basic “extra keys” UI (arrows, Ctrl, Esc, Tab), scrollback, modern minimal UI, and very fast connection setup.

---

# 2) High-level architecture

* **Transport:** `ttyd` serves a WebSocket terminal endpoint over HTTP(S).
* **Persistence layer:** `tmux` runs the shells/OpenCode TUIs so sessions survive app closes and phone sleep.
* **Discovery & auth:** The server publishes a **connect descriptor** (URL, port, token, TLS info) and advertises via **mDNS**. Phone app can also scan a **QR code** to pair.
* **Security:** Local TLS (mkcert or self-signed) + short-lived **session tokens** (rotated) + optional Basic Auth on `ttyd`. WireGuard optional for off-LAN.

---

# 3) Server CLI (Linux/macOS)

## Responsibilities

1. **Install & verify dependencies**

   * Check/install `ttyd`, `tmux`, `mkcert` (or OpenSSL) if TLS chosen.
   * Validate required ports & firewall rules.
2. **Bootstrap persistent sessions**

   * Create/reuse a named `tmux` session per “tab” (e.g., `opencode-1`, `opencode-2`).
   * Option A (recommended): Each tab = `tmux` window/pane inside one session; `ttyd` attaches to that window.
   * Option B: One `ttyd` per tab (distinct ports).
3. **Launch ttyd**

   * Attach command: `tmux attach -t <session:window>` so scrollback + copy-mode is native.
   * Enable TLS if requested; set `--credential` or header-token guard.
   * Configure terminal env for OpenCode (e.g., `TERM=xterm-256color`, locale, font/size hints via ttyd options).
4. **Connection metadata service**

   * Serve a tiny local **JSON endpoint** (e.g., `http://host:NNNN/meta`) returning:

     * Server name/host, ports, TLS flag, auth token, tab descriptors.
     * **mDNS** broadcast for zero-config discovery.
     * **QR code** (PNG) that encodes the full connection string.
5. **Lifecycle & health**

   * Keep tmux sessions alive even when no clients are connected.
   * Rotate tokens on schedule or on demand.
   * Logs + a quick **diagnostics** command (print status of tmux, ttyd, discovery, certificates).
6. **OpenCode integration**

   * Option to auto-launch OpenCode in the tmux window.
   * Provide a profile that starts in the OpenCode TUI and another that opens a plain shell.

## UX of the CLI

* `server up` → installs deps (if needed), generates TLS, starts tmux + ttyd, prints QR.
* `server tabs add "OpenCode"` → creates a new tmux window pre-running OpenCode.
* `server status` → lists endpoints, tabs, tokens, uptime.
* `server rotate-token` → rotate session tokens.
* `server down` → stop services (optionally leave tmux sessions running).

---

# 4) Mobile app (Flutter)

## Core screens

1. **Home / Connections**

   * “Scan QR”, “Discover on LAN” (mDNS), “Add manually (host\:port)”, and list of saved servers.
2. **Tabs view**

   * Shows active tabs (tmux windows) on the selected server, with quick actions: new tab, rename, close.
3. **Terminal view (per tab)**

   * **Embedded webview** pointing at the `ttyd` URL with token/TLS.
   * **Overlay “extra keys” bar:** Arrow keys, Ctrl, Esc, Tab (plus optional customizable keys like `~`, `|`, `:`).
   * **Scrollback:** Two layers:

     * **In-terminal scrollback** (gesture maps to tmux copy-mode / terminal scroll).
     * **Webview scroll** when terminal is in copy-mode or using ttyd’s client scroll.
   * **Toolbar:** Reconnect, copy/paste, font size, theme (dark/light), “lock orientation.”
4. **Settings**

   * Per-server: TLS trust (pin certificate/mkcert CA), reconnect strategy, keep-alive interval, default font size, key row layout, haptic feedback toggle.
   * Global: privacy, crash reports, export/import saved servers.

## Key behaviors

* **Multiple tabs:** One Flutter route per tab, mapped to a `tmux` window; can open/close without tearing down the session server-side.
* **Fast connect:**

  * Remember last good server and auto-reconnect on app open.
  * Background keep-alive (lightweight) so reconnection is near-instant when bringing the app to foreground.
* **Resilience:**

  * Exponential backoff on WebSocket reconnect; show transient banner instead of full-screen errors.
  * If token expires, prompt to re-scan QR or pull a fresh token from the server’s meta endpoint (if allowed).
* **Keyboard handling:**

  * Ensure hardware and soft keyboard modifiers map correctly (Ctrl combos, Esc, Tab).
  * Provide an on-screen “Ctrl+<key>” chord button for one-tap sends (e.g., `Ctrl+C`, `Ctrl+A`, `Ctrl+K`).
* **Scrolling:**

  * Two-finger swipe to toggle “scroll mode” vs “type mode”, or a dedicated “Scroll” toggle button.
  * Teach users that deeper history is available via tmux copy-mode—surface a one-tap help overlay the first time.
* **Theming & visuals:**

  * Minimal chrome around the terminal; translucent key bar; adaptive font sizing; safe-area insets respected.

---

# 5) Networking & discovery

* **Zero-config path:** App scans LAN via **mDNS** for `_opencode-ttyd._tcp` → picks up server.
* **Pairing path:** Scan **QR** generated by the server CLI → adds trusted server with TLS pin + token.
* **Manual path:** Enter `host:port` (+ optional token); guide to install the CLI if 404 is returned.

---

# 6) Security model

* **Local TLS:** Generate and use mkcert (preferred) or self-signed cert; the app stores the CA/cert fingerprint and pins it.
* **Auth token:** Short-lived bearer token in headers or `ttyd --credential` (Basic Auth) as a baseline; recommend header token with rotation.
* **LAN-only by default:** Optionally bind to WireGuard interface for off-LAN access without exposing to WAN.
* **Least privilege:** `tmux` runs under user context; no root for server CLI except package install/TLS if needed.

---

# 7) Performance & reliability

* **Startup speed:** Pre-spawn tmux windows so `ttyd` attaches instantly; keep `ttyd` resident.
* **Keep-alive:** WebSocket pings from the app; server responds, helping NATs keep the flow alive.
* **Backpressure & resize:** Ensure terminal resize is propagated; set a sensible scrollback buffer in tmux (e.g., 50k lines).
* **Resource caps:** Limit max concurrent tabs per device; expose in server config.

---

# 8) Scrollback strategy (practical)

* **Primary:** tmux history (robust, server-side, survives app restarts).
* **Client feel:** Map vertical swipe to tmux copy-mode navigation; add a “Scroll” toggle and small on-screen hints the first time.
* **Optional nicety:** A “jump to prompt” button that sends a tmux find-prompt command sequence or searches for shell prompts.

---

# 9) Multi-tab/session model

* **Server:** One tmux session per “connection profile” (e.g., `opencode`). Each “tab” is a tmux window. `ttyd` can either:

  * Run one instance per tab (simple URL mapping), or
  * Run a “router” mode that switches windows via a query param (requires a tiny sidecar to translate).
* **Client:** Tabs are lightweight routes; switching tabs just switches the URL or window id.

---

# 10) Background persistence

* **Server-side persistence** via tmux is the anchor.
* **Mobile app behavior:** When backgrounded, stop rendering but keep a lightweight reconnect token and last URL; on foreground, reconnect immediately. If the OS kills the app, the session is unaffected; reconnect is instant.

---

# 11) Testing plan (acceptance criteria)

1. **Cold connect ≤ 2s** on LAN to an existing tmux window showing OpenCode.
2. **Kill & resume:** Force-quit the app; reopen; terminal recovers state at the exact cursor location.
3. **Scrollback:** Confirm ≥ 10k lines accessible via gestures.
4. **Multi-tab:** Open 4 tabs; run different workloads; switch quickly without lag.
5. **Auth/TLS:** First pair via QR; cert pin stored; MITM attempts fail.
6. **Keyboard:** Validate Ctrl/Tab/Esc and arrows on both iOS and Android soft keyboards and with a BT keyboard.

---

# 12) Deliverable milestones

* **M1: Server CLI minimal** — Bring-up script: tmux + one ttyd + meta endpoint + QR output; manual connect from a desktop browser.
* **M2: Flutter app MVP** — Add server via QR; single terminal view; overlay key bar; reconnect logic.
* **M3: Tabs & scrollback** — Multiple tmux windows, tab UI, robust scroll/copy-mode gestures.
* **M4: Security hardening** — TLS pinning, token rotation, optional Basic Auth fallback.
* **M5: Polish & perf** — Theming, animations, latency tuning, diagnostics screen, error banners, onboarding tips.

---

# 13) Nice-to-haves (future)

* **Customizable key rows** per server/profile.
* **Clipboard sync** (with explicit user action).
* **Latency overlay** (WS ping time).
* **File upload/download helper** (SCP sidecar, gated by user consent).
* **Push notifications** when tmux window prints a matched pattern (requires a small server notifier).

---

This plan keeps the **server simple** (one small CLI that stands up tmux + ttyd + discovery) and the **client lightweight** (a clean Flutter wrapper with just enough chrome to make a terminal great on mobile). The combination of **tmux for persistence** and **ttyd for transport** gets you the durability and speed you want without reinventing the terminal stack.

