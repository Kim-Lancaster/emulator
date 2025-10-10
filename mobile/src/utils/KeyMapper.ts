// Utility to map virtual keys to terminal escape sequences

export class KeyMapper {
  static getSequence(key: string): string {
    switch (key) {
      case 'esc':
        return '\x1b';
      case 'ctrl+c':
        return '\x03';
      case 'tab':
        return '\t';
      case 'enter':
        return '\n';
      case 'backspace':
        return '\x7f';
      case 'up':
        return '\x1b[A';
      case 'down':
        return '\x1b[B';
      case 'left':
        return '\x1b[D';
      case 'right':
        return '\x1b[C';
      default:
        return key;
    }
  }
}