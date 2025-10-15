import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { RootState } from '../store/store';
import { updateSession } from '../store/sessionSlice';
import { ConnectionService } from '../services/ConnectionService';
import { SessionService } from '../services/SessionService';
import { VirtualKeyboard } from '../components/VirtualKeyboard';

export const TerminalScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeSessionId = useSelector((state: RootState) => state.session.activeSessionId);
  const sessions = useSelector((state: RootState) => state.session.sessions);
  const activeSession = sessions.find(s => s.id === activeSessionId);

  const hostUrl = activeSession?.hostUrl || 'https://localhost:8083';
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
      {Platform.OS !== 'web' ? (
        <WebView
          ref={webviewRef}
          source={{ uri: hostUrl }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          ignoreSslError={true}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView HTTP error: ', nativeEvent);
          }}
        />
      ) : (
        <iframe
          src={hostUrl}
          style={{ flex: 1, border: 'none' }}
          title="Terminal"
        />
      )}
      <TouchableOpacity style={styles.disconnectButton} onPress={handleDisconnect}>
        <Text style={styles.disconnectText}>Disconnect</Text>
      </TouchableOpacity>
      {Platform.OS !== 'web' && (
        <VirtualKeyboard onKeyPress={(script) => webviewRef.current?.injectJavaScript(script)} />
      )}
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