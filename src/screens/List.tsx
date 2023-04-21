import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { CARDS } from '../data/cards';

export function List() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {CARDS.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  list: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 48,
    marginVertical: 32,
  },
});
