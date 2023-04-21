import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <Text style={styles.subtitle}>
        Define a sequência de assuntos que você mais gosta no topo da lista
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 30,
    backgroundColor: '#212121',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#eeeeee',
  },
  subtitle: {
    textAlign: 'center',
    color: '#eeeeee',
  },
});
