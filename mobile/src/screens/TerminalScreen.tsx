import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export const TerminalScreen: React.FC = () => {
  // TODO: Get host URL from Redux state
  const hostUrl = 'http://localhost:7683'; // Placeholder

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: hostUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
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
});