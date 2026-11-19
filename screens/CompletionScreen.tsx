import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../App';
import { useSfx } from '../src/hooks/useSfx';
import { usePremium } from '../src/contexts/PremiumContext';
import { useAuth } from '../src/contexts/AuthContext';

/** Misafire "hesap oluştur" önerisi her misafir için yalnızca bir kez gösterilir. */
const guestNudgeKey = (userId: string) => `moono.guestAccountNudgeShown.${userId}`;
import { getLevelImage } from '../src/constants/levelImages';

type Props = NativeStackScreenProps<RootStackParamList, 'Completion'>;
type ConfettiPiece = {
  id: number;
  left: `${number}%`;
  size: number;
  delay: number;
  duration: number;
  rotate: string;
  drift: number;
  color: string;
};

const palette = {
  background: '#000000',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#888888',
};

const getLevelCharacterImage = (unitTitle?: string, unitId?: number) => {
  const titleMatch = unitTitle?.match(/Seviye\s*(\d+)/i);
  const levelFromTitle = titleMatch ? Number(titleMatch[1]) - 1 : -1;
  const levelFromId = typeof unitId === 'number' ? unitId - 1 : -1;
  const rawIndex = levelFromTitle >= 0 ? levelFromTitle : levelFromId;
  return getLevelImage(rawIndex);
};

export default function CompletionScreen({ route, navigation }: Props) {
  const {
    unitId,
    unitTitle,
    isUnitCompleted = false,
    forceReturnToUnitDetail = false,
    levelExamPassed = false,
    showFreeTierEndPaywall = false,
  } = route.params;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { playSound } = useSfx();
  const { openPaywall } = usePremium();
  const { isAnonymous, session } = useAuth();
  const guestUserId = session?.user?.id;
  const [guestNudge, setGuestNudge] = useState(false);
  // Misafir 5. dersi bitirdi: premium'dan önce hesap zorunlu.
  const guestMustCreateAccount = isAnonymous && showFreeTierEndPaywall;
  const showGuestNudge = isAnonymous && !showFreeTierEndPaywall && guestNudge;
  const levelCharacterImage = getLevelCharacterImage(unitTitle, unitId);
  const confettiPieces = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: 18 }).map((_, index) => ({
        id: index,
        left: `${(index / 18) * 100}%` as `${number}%`,
        size: 6 + (index % 3) * 2,
        delay: (index % 6) * 120,
        duration: 2300 + (index % 5) * 260,
        rotate: `${index % 2 === 0 ? 220 : -220}deg`,
        drift: (index % 2 === 0 ? 1 : -1) * (16 + (index % 4) * 5),
        color: index % 3 === 0 ? '#00C4CC' : index % 3 === 1 ? '#FFFFFF' : '#888888',
      })),
    []
  );
  const confettiAnims = useRef(confettiPieces.map(() => new Animated.Value(0))).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (!isAnonymous || showFreeTierEndPaywall || !guestUserId) return;
    let cancelled = false;
    (async () => {
      try {
        const key = guestNudgeKey(guestUserId);
        const shown = await AsyncStorage.getItem(key);
        if (cancelled || shown) return;
        await AsyncStorage.setItem(key, '1');
        if (!cancelled) setGuestNudge(true);
      } catch {
        // depolama okunamazsa öneriyi atla
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    playSound('complete');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.07,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1.04,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);

    pulse.start();
  }, [pulseAnim]);

  useEffect(() => {
    const animations = confettiAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: confettiPieces[index].duration,
        delay: confettiPieces[index].delay,
        useNativeDriver: true,
      })
    );

    Animated.parallel(animations).start();
  }, [confettiAnims, confettiPieces]);

  const handleContinue = () => {
    // Seviye sonundaki ders bitişinde kullanıcıyı ana sayfaya değil
    // tekrar seviye detayına döndürüyoruz ki geçiş sınavına devam edebilsin.
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Main' as never,
          params: {
            screen: 'HomeStack',
            params: {
              screen: 'UnitDetail',
              params: {
                unitId,
                unitTitle,
                levelExamPassed,
              },
            },
          } as never,
        },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.confettiLayer} pointerEvents="none">
          {confettiPieces.map((piece, index) => {
            const translateY = confettiAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: [-80, 560],
            });
            const translateX = confettiAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, piece.drift],
            });
            const rotate = confettiAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', piece.rotate],
            });
            const opacity = confettiAnims[index].interpolate({
              inputRange: [0, 0.15, 0.92, 1],
              outputRange: [0, 1, 1, 0],
            });

            return (
              <Animated.View
                key={piece.id}
                style={[
                  styles.confettiPiece,
                  {
                    left: piece.left,
                    width: piece.size,
                    height: piece.size * 1.8,
                    backgroundColor: piece.color,
                    opacity,
                    transform: [{ translateY }, { translateX }, { rotate }],
                  },
                ]}
              />
            );
          })}
        </View>
        <View style={styles.content}>
          <Animated.View style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}>
            <Image
              source={levelCharacterImage}
              style={styles.levelCharacter}
              resizeMode="cover"
            />
          </Animated.View>
          
          <Text style={styles.title}>Görev Tamamlandı!</Text>

          <Text style={styles.subtitle}>
            {guestMustCreateAccount
              ? 'Harika Ortak, ilk 5 dersi tamamladın! Devam etmek için önce ücretsiz hesabını oluştur. Şimdiye kadarki ilerlemen aynen korunur.'
              : showGuestNudge
              ? 'Harika, ilk dersin tamam! İlerlemen kaybolmasın diye istersen şimdi ücretsiz hesabını oluşturabilirsin.'
              : showFreeTierEndPaywall
              ? 'Harika Ortak! Ücretsiz yolculuk buraya kadardı — ilk 5 dersi tamamladın. 6. dersten devam etmek için Premium’a geçmen gerekiyor.'
              : 'Harika! Bir adım daha tamam. Kilidi açtın, devam!'}
          </Text>
        </View>

        {guestMustCreateAccount || showGuestNudge ? (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('CreateAccount', { required: guestMustCreateAccount })
              }
              activeOpacity={0.9}
            >
              <Text style={styles.buttonText}>Hesap Oluştur</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleContinue}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>
                {guestMustCreateAccount ? 'Şimdilik Dön' : 'Şimdi Değil'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : showFreeTierEndPaywall ? (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                openPaywall({
                  title: 'Premium ile devam et',
                  subtitle:
                    '6. dersten itibaren tüm dersler, Moono asistanı ve seviye sınavları Premium ile açılır.',
                })
              }
              activeOpacity={0.9}
            >
              <Text style={styles.buttonText}>Premium ile Devam Et</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleContinue}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>Şimdilik Dön</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>Devam Et</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confettiLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  confettiPiece: {
    position: 'absolute',
    top: 0,
    borderRadius: 2,
  },
  iconContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelCharacter: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: palette.accent,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: palette.text,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: palette.muted,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: palette.accent,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: palette.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.accent,
  },
  secondaryButtonText: {
    color: palette.accent,
    fontSize: 16,
    fontWeight: '700',
  },
});

