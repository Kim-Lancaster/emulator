import { HostMachine } from '../models/HostMachine';
import { ReconnectionHandler } from '../utils/ReconnectionHandler';

export class ConnectionService {
  private ws: WebSocket | null = null;
  private reconnectionHandler: ReconnectionHandler | null = null;

  connect(host: HostMachine): Promise<void> {
    console.log(`[ConnectionService] Connecting to ${host.ip}:${host.port}`);
    return new Promise((resolve, reject) => {
      const url = `ws://${host.ip}:${host.port}`; // Use ws for now, as TLS disabled
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log(`[ConnectionService] Connected to host ${host.id}`);
        this.reconnectionHandler?.reset();
        resolve();
      };

      this.ws.onerror = (error) => {
        console.error(`[ConnectionService] Connection error to ${host.id}`, error);
        reject(error);
      };

      this.ws.onclose = (event) => {
        console.log(`[ConnectionService] Connection closed for ${host.id}, code: ${event.code}`);
        // Start reconnection if not intentional disconnect
        if (this.reconnectionHandler) {
          this.reconnectionHandler.startReconnection();
        }
      };
    });
  }

  setReconnectionHandler(handler: ReconnectionHandler): void {
    this.reconnectionHandler = handler;
  }

  disconnect(): void {
    this.reconnectionHandler?.stopReconnection();
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