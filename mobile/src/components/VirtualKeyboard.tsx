import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface VirtualKeyboardProps {
  onKeyPress: (script: string) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  const keys = [
    { label: 'Esc', script: `console.warn('VirtualKeyboard: Injecting Esc'); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', keyCode: 27, which: 27}));` },
    { label: 'Tab', script: `console.warn('VirtualKeyboard: Injecting Tab'); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Tab', keyCode: 9, which: 9}));` },
    { label: 'Ctrl+C', script: `console.warn('VirtualKeyboard: Injecting Ctrl+C'); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'c', ctrlKey: true, keyCode: 67, which: 67}));` },
    { label: 'Enter', script: `console.warn('VirtualKeyboard: Injecting Enter'); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', keyCode: 13, which: 13}));` },
    { label: 'Backspace', script: `console.warn('VirtualKeyboard: Injecting Backspace'); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Backspace', keyCode: 8, which: 8}));` },
    { label: '↑', script: `console.warn('VirtualKeyboard: Injecting ArrowUp'); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowUp', keyCode: 38, which: 38}));` },
    { label: '↓', script: `console.warn('VirtualKeyboard: Injecting ArrowDown'); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown', keyCode: 40, which: 40}));` },
    { label: '←', script: `console.warn('VirtualKeyboard: Injecting ArrowLeft'); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowLeft', keyCode: 37, which: 37}));` },
    { label: '→', script: `console.warn('VirtualKeyboard: Injecting ArrowRight'); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', keyCode: 39, which: 39}));` },
    { label: 'PgUp', script: `console.warn('VirtualKeyboard: Injecting PageUp'); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'PageUp', keyCode: 33, which: 33}));` },
    { label: 'PgDn', script: `console.warn('VirtualKeyboard: Injecting PageDown'); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'PageDown', keyCode: 34, which: 34}));` },
  ];

  return (
    <View style={styles.container}>
      {keys.map((key) => (
        <TouchableOpacity
          key={key.label}
          style={styles.key}
          onPress={() => onKeyPress(key.script)}
        >
          <Text style={styles.keyText}>{key.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  key: {
    width: 80,
    height: 40,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  keyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});