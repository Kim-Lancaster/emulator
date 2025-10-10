# WebSocket Protocol Contract

## Overview
The app connects to the ttyd server via WebSocket for real-time terminal interaction.

## Endpoint
- URL: ws://[host]:[port]/ws
- Secured: wss:// with TLS

## Messages
- **Client to Server**: Terminal input (keystrokes, commands)
- **Server to Client**: Terminal output (text, ANSI codes)

## Authentication
- Token in query parameter or header for initial connection

## Error Handling
- Connection drops: Client attempts reconnection with backoff
- Invalid token: Server closes connection with error code 4001