import { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Map of SFX keys to their audio asset requires
export const SFX_MAP = {
  correct: require('../../assets/sfx/correct_answer.mp3'),
  error: require('../../assets/sfx/incorrect_answer.mp3'),
  unlock: require('../../assets/sfx/lesson_unlock.mp3'),
  complete: require('../../assets/sfx/lesson_complete.mp3'),
} as const;

type SfxKey = keyof typeof SFX_MAP;
const SFX_ENABLED_STORAGE_KEY = 'moono_sfx_enabled';
let sfxEnabledGlobal = true;
const sfxSubscribers = new Set<(enabled: boolean) => void>();

const notifySfxSubscribers = (enabled: boolean) => {
  sfxSubscribers.forEach((callback) => callback(enabled));
};

export function useSfx() {
  const soundsRef = useRef<Partial<Record<SfxKey, Audio.Sound>>>({});
  const [isSfxEnabled, setIsSfxEnabled] = useState(sfxEnabledGlobal);

  useEffect(() => {
    sfxSubscribers.add(setIsSfxEnabled);
    return () => {
      sfxSubscribers.delete(setIsSfxEnabled);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeSfx = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(SFX_ENABLED_STORAGE_KEY);
        if (storedValue != null) {
          sfxEnabledGlobal = storedValue === 'true';
          notifySfxSubscribers(sfxEnabledGlobal);
        }
      } catch (error) {
        console.warn('SFX settings load error:', error);
      }

      try {
        const entries = Object.entries(SFX_MAP) as [SfxKey, any][];

        for (const [key, asset] of entries) {
          try {
            const { sound } = await Audio.Sound.createAsync(asset);
            if (isMounted) {
              soundsRef.current[key] = sound;
            } else {
              // If unmounted while loading, immediately unload
              await sound.unloadAsync();
            }
          } catch (error) {
            console.warn(`SFX load error for key "${key}":`, error);
          }
        }
      } catch (error) {
        console.warn('SFX load error:', error);
      }
    };

    initializeSfx();

    return () => {
      isMounted = false;

      const unloadAll = async () => {
        const sounds = Object.values(soundsRef.current).filter(
          (s): s is Audio.Sound => !!s
        );

        for (const sound of sounds) {
          try {
            await sound.unloadAsync();
          } catch (error) {
            console.warn('SFX unload error:', error);
          }
        }

        soundsRef.current = {};
      };

      unloadAll();
    };
  }, []);

  const playSound = async (key: SfxKey) => {
    if (!sfxEnabledGlobal) return;

    const sound = soundsRef.current[key];
    if (!sound) {
      console.warn(`SFX not loaded for key "${key}"`);
      return;
    }

    try {
      // Restart from beginning each time
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch (error) {
      console.warn(`SFX play error for key "${key}":`, error);
    }
  };

  const setSfxEnabled = async (enabled: boolean) => {
    sfxEnabledGlobal = enabled;
    notifySfxSubscribers(enabled);
    try {
      await AsyncStorage.setItem(SFX_ENABLED_STORAGE_KEY, String(enabled));
    } catch (error) {
      console.warn('SFX settings save error:', error);
    }
  };

  return { playSound, isSfxEnabled, setSfxEnabled };
}


