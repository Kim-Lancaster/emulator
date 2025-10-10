import { TerminalSession } from '../models/TerminalSession';
import { StorageService } from './StorageService';

const SESSIONS_KEY = 'terminal_sessions';

export class SessionService {
  static async saveSession(session: TerminalSession): Promise<void> {
    const sessions = await this.getSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }
    await StorageService.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  }

  static async getSessions(): Promise<TerminalSession[]> {
    const data = await StorageService.getItem(SESSIONS_KEY);
    return data ? JSON.parse(data) : [];
  }

  static async deleteSession(sessionId: string): Promise<void> {
    const sessions = await this.getSessions();
    const filtered = sessions.filter(s => s.id !== sessionId);
    await StorageService.setItem(SESSIONS_KEY, JSON.stringify(filtered));
  }

  static async clearAllSessions(): Promise<void> {
    await StorageService.removeItem(SESSIONS_KEY);
  }
}