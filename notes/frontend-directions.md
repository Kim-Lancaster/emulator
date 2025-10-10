# Frontend Directions for Mobile Terminal App

This document outlines two potential directions for the frontend of the mobile terminal access app: React Native and Ionic with Capacitor. Both are cross-platform frameworks suitable for embedding terminal sessions (e.g., via ttyd) and supporting opencode.ai's TUI. Choose based on your familiarity, performance needs, and past experiences.

## React Native Direction

### Overview
React Native is a JavaScript framework for building native mobile apps using React. For this project, it would embed a webview to display the terminal interface served by ttyd on the server, with overlays for virtual keys, scrolling, and controls.

### Pros
- Mature ecosystem with robust webview libraries (e.g., `react-native-webview`) for reliable terminal embedding.
- Strong community support for handling complex CLI tools like opencode.ai, including ANSI escape codes and TUI interactions.
- Easier debugging and customization for mobile-specific features like gesture handling and background persistence.
- Familiar if you have React experience; integrates well with existing web technologies.

### Cons
- JavaScript overhead can impact performance and battery life on mobile devices.
- Webview rendering may have quirks with advanced terminal features; requires careful testing for opencode compatibility.
- Setup and build process can be complex, especially for native modules.

### Setup Steps
1. Install React Native CLI and set up a new project: `npx react-native init TerminalApp`.
2. Add webview dependency: `npm install react-native-webview`.
3. Implement webview component to load ttyd URL, with overlays for virtual keys (arrows, Ctrl, Esc, Tab) using React components.
4. Add reconnection logic with exponential backoff and error banners.
5. Test opencode TUI rendering and interactions in the webview.

### Integration Notes
- Use WebSocket for real-time updates if needed beyond webview.
- Ensure TLS pinning and token handling for secure connections.
- For scalability, design modular components for future features like tabs.

## Ionic with Capacitor Direction

### Overview
Ionic is a web-based framework (using Angular, React, or Vue) that compiles to native apps via Capacitor. It would use a webview to embed the ttyd-served terminal, with UI overlays built in HTML/CSS/JavaScript.

### Pros
- Web-first approach makes terminal embedding straightforward, with excellent support for webviews and PWA-like features.
- Lightweight and fast for prototyping; easier to handle TUI elements due to web-native rendering.
- Capacitor provides native access for mobile features (e.g., gestures, backgrounding) without full native code.
- Good for opencode.ai as it leverages standard web technologies for terminal emulation.

### Cons
- Performance may lag on resource-intensive TUIs compared to native frameworks; webview can feel less "native."
- Less optimized for complex mobile gestures or offline scenarios; may require more workarounds.
- Dependency on web standards could limit advanced terminal customizations.

### Setup Steps
1. Install Ionic CLI: `npm install -g @ionic/cli`.
2. Create a new project: `ionic start TerminalApp tabs --type=react` (or angular/vue).
3. Add Capacitor: `ionic capacitor add android` and `ionic capacitor add ios`.
4. Implement webview in Ionic pages to load ttyd URL, with overlays for virtual keys using Ionic components.
5. Add reconnection and error handling using Ionic's lifecycle hooks.
6. Test opencode TUI in browser first, then on device via Capacitor.

### Integration Notes
- Leverage Ionic's theming for modern UI; use Capacitor plugins for native features like notifications.
- Ensure secure connections with TLS and tokens; mDNS/QR for discovery.
- Scalability hooks via modular pages and services for adding tabs or users later.

## Comparison and Recommendation
- **React Native**: Better for native performance and complex integrations; recommended if you need tight control over mobile behaviors and have React experience.
- **Ionic with Capacitor**: Simpler for web-based terminal apps; ideal for quick prototyping and if webview reliability is key for opencode.
- Test both with a basic ttyd setup and opencode to confirm TUI functionality before committing.</content>
</xai:function_call name="read">
<parameter name="filePath">frontend-directions.md