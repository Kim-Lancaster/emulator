# Research Findings: A Cross-Platform Mobile Application

## Frontend Technologies

### Decision: React Native
**Rationale**: Cross-platform support for iOS and Android with native performance. Mature ecosystem for webview embedding and mobile features.
**Alternatives Considered**: Flutter (strong but webview less mature for terminals), Ionic (web-focused, less native feel).

### Decision: react-native-webview
**Rationale**: Essential for embedding ttyd's terminal interface seamlessly in the app.
**Alternatives Considered**: Native terminal libraries (limited for WebSocket), custom WebView implementations.

### Decision: React Navigation
**Rationale**: Standard for screen navigation in React Native, easy integration.
**Alternatives Considered**: React Native Navigation (more complex for simple apps).

### Decision: AsyncStorage
**Rationale**: Simple key-value storage for app data like connections.
**Alternatives Considered**: MMKV (faster, but overkill for basic needs).

### Decision: Redux Toolkit
**Rationale**: Efficient state management for global app state (connections, sessions).
**Alternatives Considered**: Context API (sufficient for small apps, but Redux for scalability).

### Decision: Jest and Detox
**Rationale**: Jest for unit tests, Detox for reliable e2e on mobile.
**Alternatives Considered**: React Native Testing Library (good for components, but Detox for full flows).

### Decision: Expo CLI
**Rationale**: Simplifies development, builds, and deployment for React Native.
**Alternatives Considered**: React Native CLI (more control, but Expo sufficient).

### Decision: react-native-qr-scanner
**Rationale**: Direct QR scanning for server pairing.
**Alternatives Considered**: Custom camera integration (more work).

## Server Technologies

### Decision: ttyd
**Rationale**: Lightweight WebSocket server for terminal sharing, integrates well with tmux.
**Alternatives Considered**: gotty (similar, but ttyd more robust), wetty (heavier).

### Decision: tmux
**Rationale**: Proven session persistence and multiplexing for terminals.
**Alternatives Considered**: screen (simpler, but tmux more feature-rich).

### Decision: qrencode
**Rationale**: Command-line QR generation for server pairing.
**Alternatives Considered**: qrcode-terminal (Node.js, but shell preferred).

## Networking & Security

### Decision: mkcert
**Rationale**: Easy local TLS certificates for secure connections.
**Alternatives Considered**: OpenSSL (more manual), Let's Encrypt (not for local).

### Decision: mDNS
**Rationale**: Zero-config discovery on local networks.
**Alternatives Considered**: Manual IP (fallback), UPnP (more complex).

### Decision: WireGuard
**Rationale**: Fast, secure VPN for remote access.
**Alternatives Considered**: OpenVPN (slower), Tailscale (easier but paid).

## Other

### Decision: ESLint
**Rationale**: Enforces code quality in React Native.
**Alternatives Considered**: TSLint (deprecated), Prettier (formatting only).