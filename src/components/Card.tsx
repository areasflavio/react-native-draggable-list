import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CardsProps } from '../data/cards';

const HEIGHT = 75;
const MARGIN_BOTTOM = 5;
export const CARD_HEIGHT: number = HEIGHT + MARGIN_BOTTOM;

type CardProps = {
  data: CardsProps;
};

export function Card({ data }: CardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <MaterialIcons name="drag-indicator" size={32} color="#eeeeee" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#444444',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#eeeeee',
  },
});
