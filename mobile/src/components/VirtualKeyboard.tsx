import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface VirtualKeyboardProps {
  onKeyPress: (script: string) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const keys = [
     { label: 'Esc', script: `console.warn('VirtualKeyboard: Injecting Esc'); document.querySelector('.xterm-helper-textarea').dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', keyCode: 27, which: 27, bubbles: true}));` },
     { label: 'Tab', script: `console.warn('VirtualKeyboard: Injecting Tab'); document.querySelector('.xterm-helper-textarea').dispatchEvent(new KeyboardEvent('keydown', {key: 'Tab', keyCode: 9, which: 9, bubbles: true}));` },
     { label: 'Ctrl+C', script: `console.warn('VirtualKeyboard: Injecting Ctrl+C'); document.querySelector('.xterm-helper-textarea').dispatchEvent(new KeyboardEvent('keydown', {key: 'c', ctrlKey: true, keyCode: 67, which: 67, bubbles: true}));` },
     { label: 'Enter', script: `console.warn('VirtualKeyboard: Injecting Enter'); document.querySelector('.xterm-helper-textarea').dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', keyCode: 13, which: 13, bubbles: true}));` },
     { label: 'Backspace', script: `console.warn('VirtualKeyboard: Injecting Backspace'); document.querySelector('.xterm-helper-textarea').dispatchEvent(new KeyboardEvent('keydown', {key: 'Backspace', keyCode: 8, which: 8, bubbles: true}));` },
     { label: '↑', script: `console.warn('VirtualKeyboard: Injecting ArrowUp'); document.querySelector('.xterm-helper-textarea').dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowUp', keyCode: 38, which: 38, bubbles: true}));` },
     { label: '↓', script: `console.warn('VirtualKeyboard: Injecting ArrowDown'); document.querySelector('.xterm-helper-textarea').dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown', keyCode: 40, which: 40, bubbles: true}));` },
     { label: '←', script: `console.warn('VirtualKeyboard: Injecting ArrowLeft'); document.querySelector('.xterm-helper-textarea').dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowLeft', keyCode: 37, which: 37, bubbles: true}));` },
     { label: '→', script: `console.warn('VirtualKeyboard: Injecting ArrowRight'); document.querySelector('.xterm-helper-textarea').dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', keyCode: 39, which: 39, bubbles: true}));` },
     { label: 'PgUp', script: `console.warn('VirtualKeyboard: Injecting PageUp'); document.querySelector('.xterm-helper-textarea').dispatchEvent(new KeyboardEvent('keydown', {key: 'PageUp', keyCode: 33, which: 33, bubbles: true}));` },
     { label: 'PgDn', script: `console.warn('VirtualKeyboard: Injecting PageDown'); document.querySelector('.xterm-helper-textarea').dispatchEvent(new KeyboardEvent('keydown', {key: 'PageDown', keyCode: 34, which: 34, bubbles: true}));` },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}
    >
      {keys.map((key) => (
        <TouchableOpacity
          key={key.label}
          style={styles.key}
          onPress={() => onKeyPress(key.script)}
        >
          <Text style={styles.keyText}>{key.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  key: {
    width: 70,
    height: 35,
    margin: 3,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  keyText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});