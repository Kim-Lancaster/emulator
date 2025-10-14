import React, { Suspense } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setActiveSession } from '../store/sessionSlice';
import { TerminalSession, SessionStatus } from '../models/TerminalSession';

const QRScanner = React.lazy(() =>
  Platform.OS !== 'web'
    ? import('../components/QRScanner').then(module => ({ default: module.QRScanner }))
    : Promise.resolve({ default: () => null })
);

export const ConnectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleQRCodeScanned = (data: string) => {
    console.log('QR Code scanned:', data);
    // TODO: Parse data, connect to host, create session, then navigate
    const session: TerminalSession = {
      id: 'test-session',
      hostId: 'localhost',
      status: SessionStatus.CONNECTED,
      history: [],
      createdAt: new Date(),
      lastActivity: new Date(),
    };
    dispatch(setActiveSession(session.id));
    navigation.navigate('Terminal' as never);
  };

  const handleTestConnect = () => {
    // Test button for manual connection
    const session: TerminalSession = {
      id: 'test-session',
      hostId: 'localhost',
      status: SessionStatus.CONNECTED,
      history: [],
      createdAt: new Date(),
      lastActivity: new Date(),
    };
    dispatch(setActiveSession(session.id));
    navigation.navigate('Terminal' as never);
  };

  return (
    <View style={styles.container}>
      <Suspense fallback={<Text>Loading camera...</Text>}>
        {Platform.OS !== 'web' && <QRScanner onQRCodeScanned={handleQRCodeScanned} />}
      </Suspense>
      {Platform.OS === 'web' && (
        <Text style={styles.webText}>Web mode: Camera not supported. Use Test Connect.</Text>
      )}
      <TouchableOpacity style={styles.testButton} onPress={handleTestConnect}>
        <Text style={styles.testText}>Test Connect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  testButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  testText: {
    color: 'white',
    fontWeight: 'bold',
  },
});