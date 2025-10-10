import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { QRScanner } from '../components/QRScanner';

export const ConnectionScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleQRCodeScanned = (data: string) => {
    console.log('QR Code scanned:', data);
    // TODO: Parse data, connect to host, then navigate
    navigation.navigate('Terminal' as never);
  };

  return (
    <View style={styles.container}>
      <QRScanner onQRCodeScanned={handleQRCodeScanned} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});