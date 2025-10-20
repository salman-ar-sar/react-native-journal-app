import { StyleSheet, Pressable, Animated } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useRef } from 'react';

type Props = {
  onPress: () => void;
};

export default function FloatingActionButton({ onPress }: Props) {
  const btnScale = useRef(new Animated.Value(1)).current;

  const animatePressedIn = () => {
    Animated.spring(btnScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const animatePressedOut = () => {
    Animated.spring(btnScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles().container, styles(btnScale).btnSize]}>
      <Pressable
        style={styles().btnStyle}
        onPress={onPress}
        onPressIn={animatePressedIn}
        onPressOut={animatePressedOut}
      >
        <Plus color={styles().icon.color} size={28} />
      </Pressable>
    </Animated.View>
  );
}

const styles = (btnScale?: Animated.Value) =>
  StyleSheet.create({
    container: {
      height: 56,
      width: 56,
      borderRadius: '50%',
      backgroundColor: '#14A4EC',

      position: 'absolute',
      bottom: 36,
      right: 16,

      elevation: 5,

      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
    },
    btnStyle: {
      height: 56,
      width: 56,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      color: '#fff',
    },
    btnSize: { transform: [{ scale: btnScale }] },
  });
