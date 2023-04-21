import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { CardsProps } from '../data/cards';
import { CARD_HEIGHT, Card } from './Card';

type DraggableCardProps = {
  data: CardsProps;
  cardsPosition: SharedValue<number[]>;
  scrollY: SharedValue<number>;
  cardsCount: number;
};

export function DraggableCard({
  data,
  cardsCount,
  cardsPosition,
  scrollY,
}: DraggableCardProps) {
  const [moving, setMoving] = useState(false);
  const cardPosition = cardsPosition.value && cardsPosition.value[data.id];
  const top = useSharedValue(cardPosition * CARD_HEIGHT);

  function objectMove(positions: number[], from: number, to: number) {
    'worklet';
    const newPositions = Object.assign({}, positions);
    for (const pos in positions) {
      if (positions[pos] === from) {
        newPositions[pos] = to;
      }
      if (positions[pos] === to) {
        newPositions[pos] = from;
      }
    }
    return newPositions;
  }

  useAnimatedReaction(
    () => cardsPosition.value[data.id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * CARD_HEIGHT);
        }
      }
    },
    [moving]
  );

  const longPressGesture = Gesture.LongPress()
    .onStart(() => runOnJS(setMoving)(true))
    .minDuration(200);

  const panGesture = Gesture.Pan()
    .onTouchesMove((_, state) => {
      moving ? state.activate() : state.fail();
    })
    .onUpdate((event) => {
      'worklet';
      const positionY = event.absoluteY + scrollY.value;
      top.value = positionY - CARD_HEIGHT;
      const startListPosition = 0;
      const endListPosition = cardsCount - 1;
      const currentPosition = Math.floor(positionY / CARD_HEIGHT);
      const newPosition = Math.max(
        startListPosition,
        Math.min(endListPosition, currentPosition)
      );
      if (newPosition !== cardsPosition.value[data.id]) {
        cardsPosition.value = objectMove(
          cardsPosition.value,
          cardsPosition.value[data.id],
          newPosition
        );
      }
    })
    .onFinalize(() => {
      const newPosition = cardsPosition.value[data.id] * CARD_HEIGHT;
      top.value = withSpring(newPosition);
      runOnJS(setMoving)(false);
    })
    .manualActivation(true)
    .simultaneousWithExternalGesture(longPressGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value - CARD_HEIGHT,
      zIndex: moving ? 1 : 0,
      opacity: withSpring(moving ? 1 : 0.4),
    };
  }, [moving]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <GestureDetector gesture={Gesture.Race(panGesture, longPressGesture)}>
        <Card data={data} />
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
