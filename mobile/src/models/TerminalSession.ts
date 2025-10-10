export enum SessionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  RECONNECTING = 'reconnecting',
}

export interface TerminalSession {
  id: string;
  hostId: string;
  status: SessionStatus;
  history: string[];
  createdAt: Date;
  lastActivity: Date;
}