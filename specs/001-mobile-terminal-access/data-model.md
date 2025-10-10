# Data Model: A Cross-Platform Mobile Application

## Entities

### Terminal Session
- **Fields**:
  - id: Unique identifier (string)
  - hostId: Reference to Host Machine (string)
  - status: Connection status (enum: connected, disconnected, reconnecting)
  - history: Command history (array of strings, limited to last 100)
  - createdAt: Timestamp (date)
  - lastActivity: Timestamp (date)
- **Relationships**: Belongs to Host Machine
- **Validation**: id required, status must be valid enum
- **State Transitions**: disconnected → reconnecting → connected

### Host Machine
- **Fields**:
  - id: Unique identifier (string)
  - ip: IP address (string)
  - port: Port number (number, default 7681 for ttyd)
  - certFingerprint: TLS certificate fingerprint (string)
  - name: Display name (string)
- **Relationships**: Has many Terminal Sessions
- **Validation**: ip valid format, port between 1024-65535

### User
- **Fields**:
  - id: Unique identifier (string)
  - connections: Array of saved Host Machine ids (array of strings)
  - preferences: App settings (object: theme, fontSize, etc.)
- **Relationships**: References Host Machines
- **Validation**: id required, connections array limited to 10