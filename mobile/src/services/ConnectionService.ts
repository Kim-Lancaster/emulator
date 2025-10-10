import { HostMachine } from '../models/HostMachine';

export class ConnectionService {
  private ws: WebSocket | null = null;

  connect(host: HostMachine): Promise<void> {
    console.log(`[ConnectionService] Connecting to ${host.ip}:${host.port}`);
    return new Promise((resolve, reject) => {
      const url = `wss://${host.ip}:${host.port}`;
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log(`[ConnectionService] Connected to host ${host.id}`);
        resolve();
      };

      this.ws.onerror = (error) => {
        console.error(`[ConnectionService] Connection error to ${host.id}`, error);
        reject(error);
      };

      this.ws.onclose = (event) => {
        console.log(`[ConnectionService] Connection closed for ${host.id}, code: ${event.code}`);
      };
    });
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(data: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    }
  }

  onMessage(callback: (data: string) => void): void {
    if (this.ws) {
      this.ws.onmessage = (event) => callback(event.data);
    }
  }
}