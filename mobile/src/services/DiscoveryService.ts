// TODO: Implement mDNS discovery using a compatible library (e.g., react-native-mdns-lite or similar for Expo)
// For now, placeholder for manual host entry

import { HostMachine } from '../models/HostMachine';

export class DiscoveryService {
  static async discoverHosts(): Promise<HostMachine[]> {
    // Placeholder: Return empty array or mock data
    // In future, use mDNS to find hosts on network
    console.log('[DiscoveryService] Discovering hosts via mDNS (not implemented)');
    return [];
  }
}