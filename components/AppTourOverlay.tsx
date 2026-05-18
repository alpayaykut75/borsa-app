import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const { height: SCREEN_H } = Dimensions.get('window');
const TOUR_SEEN_KEY = 'moono_app_tour_seen';

const palette = {
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#888888',
  card: 'rgba(20,20,20,0.95)',
  overlay: 'rgba(0,0,0,0.45)',
};

type StepConfig = {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  cardPosition: 'bottom' | 'center' | 'upper-center';
};

const STEPS: StepConfig[] = [
  {
    icon: 'map-outline',
    title: 'Seviyeler',
    description: 'Bir seviyeye dokunduğunda o seviyenin derslerini göreceksin.',
    buttonText: 'Seviyeye Git →',
    cardPosition: 'bottom',
  },
  {
    icon: 'book-outline',
    title: 'Dersler',
    description: 'Her seviyede dersler var. Sırayla tamamlayarak ilerle!',
    buttonText: 'Anladım, Devam →',
    cardPosition: 'bottom',
  },
  {
    icon: 'sparkles',
    title: 'Moono Asistan',
    description: 'Yapay zeka asistanın! Merak ettiklerini buradan sor.',
    buttonText: 'Devam →',
    cardPosition: 'center',
  },
  {
    icon: 'person-outline',
    title: 'Profil',
    description: 'Bilgilerini düzenle ve ilerlemeni takip et.',
    buttonText: 'Devam →',
    cardPosition: 'upper-center',
  },
  {
    icon: 'rocket-outline',
    title: 'Hazırsın!',
    description: 'Artık ilk seviyeye dokunarak öğrenmeye başlayabilirsin. İyi dersler!',
    buttonText: 'Başla!',
    cardPosition: 'bottom',
  },
];

type Props = {
  navigationRef: React.RefObject<any>;
  onFinish: () => void;
};

export default function AppTourOverlay({ navigationRef, onFinish }: Props) {
  const [step, setStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [firstUnit, setFirstUnit] = useState<{ id: number; title: string } | null>(null);
  const overlayFade = useRef(new Animated.Value(0)).current;
  const cardFade = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    supabase
      .from('units')
      .select('id, title')
      .order('order_index', { ascending: true })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) setFirstUnit(data);
      });

    Animated.timing(overlayFade, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => showCard());
  }, []);

  const showCard = () => {
    cardFade.setValue(0);
    cardScale.setValue(0.92);
    Animated.parallel([
      Animated.timing(cardFade, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.spring(cardScale, { toValue: 1, friction: 8, tension: 60, useNativeDriver: true }),
    ]).start();
  };

  const hideCard = (): Promise<void> =>
    new Promise((resolve) => {
      Animated.parallel([
        Animated.timing(cardFade, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.timing(cardScale, { toValue: 0.92, duration: 150, useNativeDriver: true }),
      ]).start(() => resolve());
    });

  const navigateAndShow = async (navigate: () => void, delay = 500) => {
    setTransitioning(true);
    navigate();
    await new Promise((r) => setTimeout(r, delay));
    setTransitioning(false);
    showCard();
  };

  const handleNext = async () => {
    if (transitioning) return;
    await hideCard();
    const next = step + 1;

    if (next >= STEPS.length) {
      await handleFinish();
      return;
    }

    setStep(next);

    const nav = navigationRef.current;
    if (!nav) {
      showCard();
      return;
    }

    switch (next) {
      case 1:
        if (firstUnit) {
          await navigateAndShow(() => {
            nav.navigate('Main', {
              screen: 'HomeStack',
              params: {
                screen: 'UnitDetail',
                params: { unitId: firstUnit.id, unitTitle: firstUnit.title },
              },
            });
          });
        } else {
          showCard();
        }
        break;

      case 2:
        await navigateAndShow(() => {
          nav.navigate('Main', { screen: 'HomeStack', params: { screen: 'Home' } });
          setTimeout(() => nav.navigate('Main', { screen: 'Assistant' }), 250);
        }, 700);
        break;

      case 3:
        await navigateAndShow(() => {
          nav.navigate('Main', { screen: 'Profile' });
        });
        break;

      case 4:
        await navigateAndShow(() => {
          nav.navigate('Main', { screen: 'HomeStack', params: { screen: 'Home' } });
        });
        break;

      default:
        showCard();
    }
  };

  const handleFinish = async () => {
    await AsyncStorage.setItem(TOUR_SEEN_KEY, 'true');
    const nav = navigationRef.current;
    if (nav) {
      nav.navigate('Main', { screen: 'HomeStack', params: { screen: 'Home' } });
    }
    Animated.timing(overlayFade, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onFinish());
  };

  const handleSkip = async () => {
    await hideCard();
    await handleFinish();
  };

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const getCardPositionStyle = () => {
    switch (current.cardPosition) {
      case 'bottom':
        return { bottom: Platform.OS === 'ios' ? 100 : 80 };
      case 'center':
        return { top: SCREEN_H * 0.32 };
      case 'upper-center':
        return { top: SCREEN_H * 0.22 };
    }
  };

  return (
    <Animated.View style={[styles.overlay, { opacity: overlayFade }]} pointerEvents="auto">
      {/* Dots - top */}
      <View style={styles.dotsRow}>
        {STEPS.map((_, i) => (
          <View key={i} style={[styles.dot, i === step && styles.dotActive, i < step && styles.dotDone]} />
        ))}
      </View>

      {/* Card - positioned per step */}
      <Animated.View
        style={[
          styles.card,
          getCardPositionStyle(),
          { opacity: cardFade, transform: [{ scale: cardScale }] },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconCircle}>
            <Ionicons name={current.icon} size={22} color={palette.accent} />
          </View>
          <Text style={styles.title}>{current.title}</Text>
        </View>

        <Text style={styles.description}>{current.description}</Text>

        <View style={styles.buttonRow}>
          {!isLast && (
            <TouchableOpacity style={styles.skipBtn} activeOpacity={0.7} onPress={handleSkip}>
              <Text style={styles.skipText}>Atla</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.nextBtn, isLast && styles.nextBtnFull]}
            activeOpacity={0.85}
            onPress={handleNext}
            disabled={transitioning}
          >
            <Text style={styles.nextText}>{current.buttonText}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Step counter */}
      <Text style={styles.stepCounter}>{step + 1} / {STEPS.length}</Text>
    </Animated.View>
  );
}

export { TOUR_SEEN_KEY };

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: palette.overlay,
    zIndex: 9999,
    elevation: 9999,
  },
  dotsRow: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 62 : 42,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dotActive: {
    width: 20,
    backgroundColor: palette.accent,
  },
  dotDone: {
    backgroundColor: 'rgba(0,196,204,0.5)',
  },
  card: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: palette.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,196,204,0.25)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,196,204,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0,196,204,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: palette.accent,
  },
  description: {
    fontSize: 15,
    color: palette.text,
    lineHeight: 22,
    marginBottom: 18,
    opacity: 0.85,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  skipBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  skipText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  nextBtn: {
    flex: 2,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.accent,
  },
  nextBtnFull: {
    flex: 1,
  },
  nextText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  stepCounter: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 52 : 32,
    alignSelf: 'center',
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '500',
  },
});
