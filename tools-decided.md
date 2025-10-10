# Decided Tools for Mobile Terminal App (v1.0 - Updated: 2025-10-09)

This document lists the tools and technologies we've decided to use for the project. We'll add to it as we brainstorm and refine further.

## Frontend
- **React Native**: Cross-platform framework for building the mobile app, providing native performance and UI components.
- **react-native-webview**: Library for embedding web content (e.g., ttyd's terminal interface) within the React Native app, with support for overlays and interactions.
- **React Navigation**: For handling app navigation between screens (e.g., connections, settings).
- **AsyncStorage**: For persisting app data like server connections and user preferences.
- **Reconnection library** (e.g., custom WebSocket wrapper or `reconnecting-websocket`): To manage connection drops with exponential backoff.
- **Testing tools**: Jest for unit tests and Detox for end-to-end testing.
- **Build tool**: Expo CLI for easier development, builds, and deployment.
- **react-native-vision-camera** with **vision-camera-code-scanner**: For scanning QR codes to pair with the server.
- **Redux Toolkit**: For state management to handle global app state efficiently.

## Server
- **ttyd**: For serving terminal sessions over WebSocket/HTTP to the frontend.
- **tmux**: For session persistence and multiplexing (core functionality).
- **tmux-resurrect** (optional, future): Plugin for automated session recovery across reboots.
- **tpm** (optional, future): Plugin manager for tmux extensions.

## Networking & Security
- **mkcert**: For generating local TLS certificates to secure connections.
- **mDNS**: For zero-config discovery of the server on the local network.
- **QR code generation** (via qrencode): For easy pairing by scanning a code to connect the app to the server.
- **Manual IP entry**: Fallback option for connections if mDNS fails.
- **WireGuard**: VPN for secure remote access to the home network.

## Other
- **ESLint**: For linting and enforcing code quality standards in React Native.

## Integration Notes
- **ttyd and tmux**: ttyd attaches to tmux sessions for persistent terminal serving over WebSocket.
- **Frontend and Server**: React Native webview connects to ttyd's WebSocket endpoint for real-time terminal access.
- **Networking**: mDNS and QR codes facilitate initial pairing, with WireGuard enabling secure remote connections.</content>
</xai:function_call name="read">
<parameter name="filePath">tools-decided.md