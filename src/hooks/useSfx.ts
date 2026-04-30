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
type PlaySoundOptions = {
  volume?: number;
  maxDurationMs?: number;
};

const SFX_ENABLED_STORAGE_KEY = 'moono_sfx_enabled';
const SFX_VOLUME_MAP: Record<SfxKey, number> = {
  correct: 0.55,
  error: 0.5,
  unlock: 0.45,
  complete: 0.6,
};

let sfxEnabledGlobal = true;
const sfxSubscribers = new Set<(enabled: boolean) => void>();
const sharedSounds: Partial<Record<SfxKey, Audio.Sound>> = {};
const stopTimeouts: Partial<Record<SfxKey, ReturnType<typeof setTimeout>>> = {};
let isSfxInitialized = false;
let sfxInitPromise: Promise<void> | null = null;

const notifySfxSubscribers = (enabled: boolean) => {
  sfxSubscribers.forEach((callback) => callback(enabled));
};

export function useSfx() {
  const soundsRef = useRef(sharedSounds);
  const [isSfxEnabled, setIsSfxEnabled] = useState(sfxEnabledGlobal);

  useEffect(() => {
    sfxSubscribers.add(setIsSfxEnabled);
    return () => {
      sfxSubscribers.delete(setIsSfxEnabled);
    };
  }, []);

  useEffect(() => {
    const initializeSfx = async () => {
      if (isSfxInitialized) return;
      if (sfxInitPromise) {
        await sfxInitPromise;
        return;
      }

      sfxInitPromise = (async () => {
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
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        const entries = Object.entries(SFX_MAP) as [SfxKey, any][];

        for (const [key, asset] of entries) {
          if (sharedSounds[key]) continue;
          try {
            const { sound } = await Audio.Sound.createAsync(asset);
            await sound.setVolumeAsync(SFX_VOLUME_MAP[key]);
            sharedSounds[key] = sound;
          } catch (error) {
            console.warn(`SFX load error for key "${key}":`, error);
          }
        }
        isSfxInitialized = true;
      } catch (error) {
        console.warn('SFX load error:', error);
      }
      })();

      await sfxInitPromise;
      sfxInitPromise = null;
    };

    initializeSfx();
  }, []);

  const playSound = async (key: SfxKey, options?: PlaySoundOptions) => {
    if (!sfxEnabledGlobal) return;

    if (!isSfxInitialized) {
      if (sfxInitPromise) {
        await sfxInitPromise;
      }
    }

    const sound = soundsRef.current[key];
    if (!sound) {
      console.warn(`SFX not loaded for key "${key}"`);
      return;
    }

    try {
      const baseVolume = SFX_VOLUME_MAP[key];
      const targetVolume = options?.volume ?? baseVolume;

      // Stop current playback to avoid overlap artifacts, then restart.
      await sound.stopAsync();
      await sound.setVolumeAsync(targetVolume);
      await sound.setPositionAsync(0);
      await sound.playAsync();

      if (stopTimeouts[key]) {
        clearTimeout(stopTimeouts[key]);
      }

      if (options?.maxDurationMs != null && options.maxDurationMs > 0) {
        stopTimeouts[key] = setTimeout(async () => {
          try {
            await sound.stopAsync();
            await sound.setPositionAsync(0);
            await sound.setVolumeAsync(baseVolume);
          } catch {
            // no-op
          }
        }, options.maxDurationMs);
      } else if (targetVolume !== baseVolume) {
        // Restore default volume after a short delay.
        stopTimeouts[key] = setTimeout(async () => {
          try {
            await sound.setVolumeAsync(baseVolume);
          } catch {
            // no-op
          }
        }, 450);
      }
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


