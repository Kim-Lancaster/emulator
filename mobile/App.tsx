import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store/store';
import { setSessions } from './src/store/sessionSlice';
import { SessionService } from './src/services/SessionService';
import { ConnectionScreen } from './src/screens/ConnectionScreen';
import { TerminalScreen } from './src/screens/TerminalScreen';

const Stack = createStackNavigator();

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSessions = async () => {
      const sessions = await SessionService.getSessions();
      dispatch(setSessions(sessions));
    };
    loadSessions();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Connection" component={ConnectionScreen} />
        <Stack.Screen name="Terminal" component={TerminalScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
