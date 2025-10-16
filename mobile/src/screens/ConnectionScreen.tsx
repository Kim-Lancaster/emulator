import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setActiveSession } from '../store/sessionSlice';
import { TerminalSession, SessionStatus } from '../models/TerminalSession';

export const ConnectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [serverUrl, setServerUrl] = useState('10.0.2.2:8888');

  const handleConnect = () => {
    const session: TerminalSession = {
      id: `session-${Date.now()}`,
      hostId: serverUrl.split(':')[0],
      hostUrl: `https://${serverUrl}`,
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
      <TextInput
        style={styles.input}
        placeholder="Enter server URL (e.g., 10.0.2.2:8888)"
        value={serverUrl}
        onChangeText={setServerUrl}
      />
      <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
        <Text style={styles.connectText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  connectButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  connectText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});