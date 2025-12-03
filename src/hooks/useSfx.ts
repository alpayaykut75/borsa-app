import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

// Map of SFX keys to their audio asset requires
export const SFX_MAP = {
  correct: require('../../assets/sfx/correct_answer.mp3'),
  error: require('../../assets/sfx/incorrect_answer.mp3'),
  unlock: require('../../assets/sfx/lesson_unlock.mp3'),
  complete: require('../../assets/sfx/lesson_complete.mp3'),
} as const;

type SfxKey = keyof typeof SFX_MAP;

export function useSfx() {
  const soundsRef = useRef<Partial<Record<SfxKey, Audio.Sound>>>({});

  // Placeholder flag for future settings integration
  const isSfxEnabled = true;

  useEffect(() => {
    let isMounted = true;

    const loadAllSounds = async () => {
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

    loadAllSounds();

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
    if (!isSfxEnabled) return;

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

  return { playSound };
}


