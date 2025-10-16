# Quickstart: A Cross-Platform Mobile Application

## Prerequisites
- Node.js v18.17.0 (bundled in project)
- Expo CLI
- React Native development environment (iOS/Android/Web)
- Linux/macOS for server
- ttyd v1.6.3, tmux installed

## Server Setup
1. Install dependencies: `sudo apt install ttyd tmux`
2. Start server: `cd server/scripts && ./start.sh` (runs ttyd with tmux on port 3000)
3. Server accessible at http://localhost:3000 (WebSocket ws://localhost:3000)

## App Setup
1. Clone repo, checkout branch `001-mobile-terminal-access`
2. `cd mobile && npm install`
3. For web testing: `npx expo start --web --localhost --port 8081` (runs on http://localhost:8081)
4. For native APK build: `npx expo run:android` (builds and installs debug APK on connected device)
5. For emulator: Use Android emulator, connect to 10.0.2.2:3000
6. For physical device: Connect to localhost:3000 (ensure on same network)
7. Connect to server via manual input (default 10.0.2.2:3000 for emulator)

## Features
- Connect to host terminal via WebSocket
- Persistent sessions with tmux
- Virtual keyboard for special keys
- Scroll through terminal history

## Testing
- Web: Open http://localhost:8081, enter server URL (e.g., localhost:3000)
- Native: Run APK on device/emulator, enter server URL (10.0.2.2:3000 for emulator, localhost:3000 for device)
- Run tests: `npm test` (if available)

## Deployment
- Build with Expo: `expo build:android` / `expo build:ios` / `expo build:web`