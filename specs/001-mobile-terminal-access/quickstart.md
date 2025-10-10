# Quickstart: A Cross-Platform Mobile Application

## Prerequisites
- Node.js, npm, Expo CLI
- React Native development environment (iOS/Android)
- Linux/macOS for server
- ttyd, tmux, qrencode, mkcert installed

## Server Setup
1. Install dependencies: `sudo apt install ttyd tmux qrencode`
2. Generate cert: `mkcert localhost`
3. Start server: `./server/start.sh` (runs ttyd with tmux)
4. Note QR code output for pairing

## App Setup
1. Clone repo, checkout branch
2. `cd mobile && npm install`
3. `expo start` to run app
4. Scan QR from server to connect

## Testing
- Run unit tests: `npm test`
- E2E: `detox test`

## Deployment
- Build with Expo: `expo build:android` / `expo build:ios`