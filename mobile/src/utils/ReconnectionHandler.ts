export class ReconnectionHandler {
  private reconnectAttempts = 0;
  private maxAttempts = 5;
  private baseDelay = 1000; // 1 second
  private maxDelay = 30000; // 30 seconds
  private timeoutId: NodeJS.Timeout | null = null;

  constructor(private onReconnect: () => Promise<void>) {}

  startReconnection(): void {
    if (this.reconnectAttempts >= this.maxAttempts) {
      console.log('Max reconnection attempts reached');
      return;
    }

    const delay = Math.min(this.baseDelay * Math.pow(2, this.reconnectAttempts), this.maxDelay);
    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts + 1})`);

    this.timeoutId = setTimeout(async () => {
      try {
        await this.onReconnect();
        this.reset();
      } catch (error) {
        console.error('Reconnection failed:', error);
        this.reconnectAttempts++;
        this.startReconnection();
      }
    }, delay);
  }

  stopReconnection(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  reset(): void {
    this.reconnectAttempts = 0;
    this.stopReconnection();
  }
}