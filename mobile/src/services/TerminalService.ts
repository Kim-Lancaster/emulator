// Service for terminal operations, e.g., sending commands, managing sessions

export class TerminalService {
  private static history: string[] = [];
  private static historyIndex: number = -1;

  // TODO: Implement command sending, session management
  static sendCommand(command: string): void {
    console.log('Sending command:', command);
    // In webview, commands are sent via input
    this.history.push(command);
    this.historyIndex = this.history.length;
  }

  // History buffer methods
  static getPreviousCommand(): string | null {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      return this.history[this.historyIndex];
    }
    return null;
  }

  static getNextCommand(): string | null {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      return this.history[this.historyIndex];
    }
    return null;
  }
}