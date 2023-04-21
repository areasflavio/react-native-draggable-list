import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { CARD_HEIGHT } from '../components/Card';
import { DraggableCard } from '../components/DraggableCard';
import { Header } from '../components/Header';
import { CARDS } from '../data/cards';

export function List() {
  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const listToObject = (list: typeof CARDS) => {
    const listOfCards = Object.values(list);
    const obj: any = {};
    listOfCards.forEach((card, index) => {
      obj[card.id] = index;
    });
    return obj;
  };

  const cardsPosition = useSharedValue(listToObject(CARDS));

  return (
    <View style={styles.container}>
      <Header />
      <Animated.ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: CARDS.length * CARD_HEIGHT }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {CARDS.map((item) => (
          <DraggableCard
            key={item.id}
            data={item}
            scrollY={scrollY}
            cardsPosition={cardsPosition}
            cardsCount={CARDS.length}
          />
        ))}
      </Animated.ScrollView>
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
    position: 'relative',
    paddingHorizontal: 32,
    paddingBottom: 48,
    marginVertical: 32,
  },
});
