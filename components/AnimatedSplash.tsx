import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Audio, Video, ResizeMode } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AnimatedSplashProps = {
  onFinish: () => void;
};

const palette = {
  background: '#000000',
  text: '#FFFFFF',
};

const BRAND_TEXT = 'MOONO';
const TYPEWRITER_DURATION = 1000;
const HOLD_DURATION = 3000;
const TOTAL_DURATION = TYPEWRITER_DURATION + HOLD_DURATION;
const SFX_ENABLED_STORAGE_KEY = 'moono_sfx_enabled';

const SPLASH_VIDEO_SOURCE = require('../assets/videos/splash-intro.mp4');

export default function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [videoReady, setVideoReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Audio.Sound | null>(null);
  const splashHiddenRef = useRef(false);

  const hideNativeSplashOnce = async () => {
    if (splashHiddenRef.current) return;
    splashHiddenRef.current = true;
    try {
      await SplashScreen.hideAsync();
    } catch {
      /* yoksa sorun değil */
    }
  };

  useEffect(() => {
    const loadAndPlaySound = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(SFX_ENABLED_STORAGE_KEY);
        if (storedValue === 'false') return;

        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sfx/splash_chime.mp3'),
          { shouldPlay: false, volume: 0.65 },
        );
        soundRef.current = sound;
        await sound.playFromPositionAsync(0);
      } catch (error) {
        console.warn('Error loading splash sound:', error);
      }
    };

    loadAndPlaySound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
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
      { iterations: -1 },
    );
    pulseAnimation.start();

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < BRAND_TEXT.length) {
        setDisplayedText(BRAND_TEXT.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, TYPEWRITER_DURATION / BRAND_TEXT.length);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

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

  const onVideoReadyForDisplay = () => {
    if (videoReady) return;
    setVideoReady(true);
    hideNativeSplashOnce();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <Video
          source={SPLASH_VIDEO_SOURCE}
          style={[styles.splashVideo, !videoReady && styles.videoHidden]}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted
          onReadyForDisplay={onVideoReadyForDisplay}
          onError={() => {
            hideNativeSplashOnce();
            setVideoReady(true);
          }}
        />
      </Animated.View>

      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
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
  splashVideo: {
    width: '100%',
    height: '100%',
  },
  videoHidden: {
    opacity: 0,
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
