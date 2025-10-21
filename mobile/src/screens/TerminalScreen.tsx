 import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, Keyboard, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { RootState } from '../store/store';
import { updateSession, setActiveSession } from '../store/sessionSlice';
import { ConnectionService } from '../services/ConnectionService';
import { SessionService } from '../services/SessionService';
import { VirtualKeyboard } from '../components/VirtualKeyboard';

export const TerminalScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeSessionId = useSelector((state: RootState) => state.session.activeSessionId);
  const sessions = useSelector((state: RootState) => state.session.sessions);
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
  const activeSession = sessions.find(s => s.id === activeSessionId);

  const hostUrl = activeSession?.hostUrl || 'http://10.222.3.71:3000';
  const webviewRef = useRef<WebView>(null);

  const handleDisconnect = async () => {
    ConnectionService.disconnect();
    if (activeSession) {
      const updatedSession = { ...activeSession, status: 'disconnected' as const };
      dispatch(updateSession(updatedSession));
      await SessionService.saveSession(updatedSession);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 10, right: 10, width: 20, height: 20, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 5, zIndex: 1 }}>
        <TouchableOpacity onPress={() => { dispatch(setActiveSession(null)); navigation.goBack(); }} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 12 }}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {Platform.OS !== 'web' ? (
          <WebView
            ref={webviewRef}
            source={{ uri: hostUrl }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            ignoreSslError={true}
            keyboardDisplayRequiresUserAction={false}
            injectedJavaScript={`setTimeout(() => { document.querySelector('input, textarea, [contenteditable]')?.focus(); }, 1000);`}
            onLoadEnd={() => {
              webviewRef.current?.injectJavaScript(`document.querySelector('input, textarea, [contenteditable]')?.focus();`);
            }}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
          />
        ) : (
          <iframe
            src={hostUrl}
            style={styles.webview}
          />
        )}
      </View>
      {Platform.OS !== 'web' && (
        <View style={{ height: '13%', alignItems: 'center' }}>
          <VirtualKeyboard onKeyPress={(script) => webviewRef.current?.injectJavaScript(script)} />
        </View>
      )}
      <View style={{ height: keyboardHeight }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disconnectButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  disconnectText: {
    color: 'white',
    fontWeight: 'bold',
  },
});