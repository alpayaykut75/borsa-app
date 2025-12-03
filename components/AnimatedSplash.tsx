import { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';

type AnimatedSplashProps = {
  onFinish: () => void;
};

const palette = {
  background: '#000000',
  text: '#FFFFFF',
};

const BRAND_TEXT = 'MOONO';
const TYPEWRITER_DURATION = 1000; // 1 second
const HOLD_DURATION = 3500; // 3.5 seconds (to make total 4.5s)
const TOTAL_DURATION = TYPEWRITER_DURATION + HOLD_DURATION; // 4.5 seconds total
const SOUND_PLAY_DELAY = 1500; // 1.5 seconds - right when text stabilizes

export default function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const [displayedText, setDisplayedText] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Audio.Sound | null>(null);

  // Load and play splash sound
  useEffect(() => {
    let soundTimer: NodeJS.Timeout | null = null;

    const loadAndPlaySound = async () => {
      try {
        // Load the sound file
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sfx/splash_chime.mp3')
        );
        soundRef.current = sound;

        // Play sound at the right timing (1.5 seconds - when text stabilizes)
        soundTimer = setTimeout(async () => {
          try {
            await sound.playAsync();
          } catch (playError) {
            console.warn('Error playing splash sound:', playError);
          }
        }, SOUND_PLAY_DELAY);
      } catch (error) {
        console.warn('Error loading splash sound:', error);
      }
    };

    loadAndPlaySound();

    // Cleanup: unload sound when component unmounts
    return () => {
      if (soundTimer) {
        clearTimeout(soundTimer);
      }
      if (soundRef.current) {
        soundRef.current
          .unloadAsync()
          .catch((error) => {
            console.warn('Error unloading splash sound:', error);
          });
        soundRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Continuous pulsing animation for bull image - starts immediately and loops for entire duration
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 } // Infinite loop
    );
    pulseAnimation.start();

    // Typewriter effect
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < BRAND_TEXT.length) {
        setDisplayedText(BRAND_TEXT.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, TYPEWRITER_DURATION / BRAND_TEXT.length);

    // Fade in text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // After typing completes, hold for remaining duration (3.5s), then fade out and finish
    const finishTimer = setTimeout(() => {
      pulseAnimation.stop();
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }, TOTAL_DURATION);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(finishTimer);
      pulseAnimation.stop();
    };
  }, [fadeAnim, pulseAnim, onFinish]);

  return (
    <View style={styles.container}>
      {/* Moono Bull Image at Bottom with Pulse Animation */}
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <Image
          source={require('../assets/moono_bull.png')}
          style={styles.bullImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* MOONO Text Higher Up */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.brandText}>{displayedText}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  imageContainer: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '50%',
  },
  bullImage: {
    width: '85%',
    height: '100%',
    maxHeight: 400,
  },
  textContainer: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 48,
    fontWeight: '900',
    color: palette.text,
    letterSpacing: 4,
  },
});

