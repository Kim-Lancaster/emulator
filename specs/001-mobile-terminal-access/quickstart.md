# Quickstart: A Cross-Platform Mobile Application

## Prerequisites
- Node.js v18.17.0 (bundled in project)
- Expo CLI
- React Native development environment (iOS/Android/Web)
- Linux/macOS for server
- ttyd v1.6.3, tmux installed

## Server Setup
1. Install dependencies: `sudo apt install ttyd tmux`
2. Start server: `cd server/scripts && ./start.sh` (runs ttyd with tmux on port 7683)
3. Server accessible at http://localhost:7683 (WebSocket ws://localhost:7683)

## App Setup
1. Clone repo, checkout branch `001-mobile-terminal-access`
2. `cd mobile && npm install`
3. For web testing: `npm run web -- --host lan` (runs on http://localhost:8081)
4. For native: `expo start` and scan QR or run on device
5. Connect to server via test button (web) or QR scan (native)

## Features
- Connect to host terminal via WebSocket
- Persistent sessions with tmux
- Virtual keyboard for special keys
- Scroll through terminal history

## Testing
- Web: Open http://localhost:8081, click "Test Connect"
- Native: Run on device, use QR scanner or manual connect
- Run tests: `npm test` (if available)

## Deployment
- Build with Expo: `expo build:android` / `expo build:ios` / `expo build:web`