import { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Audio, Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AnimatedSplashProps = {
  onFinish: () => void;
};

const palette = {
  background: '#000000',
  text: '#FFFFFF',
};

const BRAND_TEXT = 'MOONO';
const TYPEWRITER_DURATION = 1000; // 1 second
const HOLD_DURATION = 3000; // 3.0 seconds (to make total 4.0s)
const TOTAL_DURATION = TYPEWRITER_DURATION + HOLD_DURATION; // 4.0 seconds total
const SFX_ENABLED_STORAGE_KEY = 'moono_sfx_enabled';
// Optional local video support:
// 1) Put a file like: assets/videos/splash_intro.mp4
// 2) Replace null with: require('../assets/videos/splash_intro.mp4')
// Keep null to use the default Moono image splash.
const SPLASH_VIDEO_SOURCE: number | null = require('../assets/videos/Siyah_Arka_Planlı_Göz_Kırpma_Videosu.mp4');

export default function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isVideoReady, setIsVideoReady] = useState(!SPLASH_VIDEO_SOURCE);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const videoOpacityAnim = useRef(new Animated.Value(SPLASH_VIDEO_SOURCE ? 0 : 1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Audio.Sound | null>(null);

  // Load and play splash sound
  useEffect(() => {
    const loadAndPlaySound = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(SFX_ENABLED_STORAGE_KEY);
        if (storedValue === 'false') return;

        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        // Start sound immediately so audio and visual open together.
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sfx/splash_chime.mp3'),
          { shouldPlay: false, volume: 0.65 }
        );
        soundRef.current = sound;
        await sound.playFromPositionAsync(0);
      } catch (error) {
        console.warn('Error loading splash sound:', error);
      }
    };

    loadAndPlaySound();

    // Cleanup: unload sound when component unmounts
    return () => {
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

  useEffect(() => {
    if (isVideoReady) {
      Animated.timing(videoOpacityAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [isVideoReady, videoOpacityAnim]);

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
        {SPLASH_VIDEO_SOURCE ? (
          <>
            <Video
              source={SPLASH_VIDEO_SOURCE}
              style={styles.splashVideo}
              resizeMode={ResizeMode.COVER}
              shouldPlay
              isLooping
              isMuted
              onReadyForDisplay={() => setIsVideoReady(true)}
              onError={() => setIsVideoReady(true)}
            />
            {!isVideoReady && <View style={styles.videoPlaceholder} />}
            <Animated.View
              style={[styles.videoPlaceholder, { opacity: videoOpacityAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]}
              pointerEvents="none"
            />
          </>
        ) : (
          <Image
            source={require('../assets/moono_bull.png')}
            style={styles.bullImage}
            resizeMode="contain"
          />
        )}
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
  splashVideo: {
    width: '100%',
    height: '100%',
  },
  videoPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: palette.background,
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

