import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import { cacheProfileAvatar } from '../src/constants/profileStorage';
import { DEFAULT_PROFILE_AVATAR_ID } from '../src/constants/avatars';
import ProfileAvatarPicker from '../components/ProfileAvatarPicker';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const palette = {
  background: '#000000',
  card: '#1A1A1A',
  cardDark: '#0F0F0F',
  border: '#333333',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#888888',
  danger: '#EF4444',
};

const STEPS = [
  { title: 'Merhaba!', subtitle: 'Seni tanıyalım. Adın nedir?' },
  { title: 'Bir avatar seç', subtitle: 'Seni temsil edecek bir karakter seç.' },
  { title: 'Son adım', subtitle: 'Birkaç bilgi daha. Hepsi isteğe bağlı.' },
];

type Props = {
  userId: string;
  onComplete: () => void;
};

export default function OnboardingScreen({ userId, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_PROFILE_AVATAR_ID);
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateToStep = (nextStep: number) => {
    const direction = nextStep > step ? -1 : 1;
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: direction * 40, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      setStep(nextStep);
      slideAnim.setValue(-direction * 40);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (step === 0 && !firstName.trim()) {
      setError('Lütfen adını gir.');
      return;
    }
    setError('');
    animateToStep(step + 1);
  };

  const handleBack = () => {
    setError('');
    animateToStep(step - 1);
  };

  const handleFinish = async () => {
    if (!firstName.trim()) {
      setError('Lütfen adını gir.');
      return;
    }
    setSaving(true);
    setError('');

    const { error: dbError } = await supabase.from('profiles').upsert({
      id: userId,
      first_name: firstName.trim(),
      last_name: lastName.trim() || null,
      avatar: selectedAvatar,
      country: country.trim() || null,
      age: age ? parseInt(age, 10) : null,
      gender: gender.trim() || null,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);

    if (dbError) {
      setError('Kaydetme sırasında bir hata oluştu. Lütfen tekrar dene.');
      return;
    }

    await cacheProfileAvatar(selectedAvatar);
    onComplete();
  };

  const renderDots = () => (
    <View style={styles.dotsRow}>
      {STEPS.map((_, i) => (
        <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
      ))}
    </View>
  );

  const renderStep0 = () => (
    <View style={styles.stepContent}>
      <TextInput
        style={styles.input}
        placeholder="Ad *"
        placeholderTextColor="#666"
        value={firstName}
        onChangeText={(t) => { setFirstName(t); setError(''); }}
        autoCapitalize="words"
        autoCorrect={false}
        textContentType="none"
        returnKeyType="next"
      />
      <TextInput
        style={styles.input}
        placeholder="Soyad (isteğe bağlı)"
        placeholderTextColor="#666"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
        autoCorrect={false}
        textContentType="none"
        returnKeyType="done"
      />
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <View style={styles.avatarSelectChip}>
        <Ionicons name="sparkles-outline" size={18} color={palette.accent} />
        <Text style={styles.avatarSelectChipText}>Avatar seç</Text>
      </View>
      <ProfileAvatarPicker
        selectedId={selectedAvatar}
        onSelect={setSelectedAvatar}
        columnsPerRow={5}
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <TextInput
        style={styles.input}
        placeholder="Ülke"
        placeholderTextColor="#666"
        value={country}
        onChangeText={setCountry}
      />
      <View style={styles.formRow}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Yaş"
          placeholderTextColor="#666"
          value={age}
          onChangeText={(t) => setAge(t.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          maxLength={3}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Cinsiyet"
          placeholderTextColor="#666"
          value={gender}
          onChangeText={setGender}
        />
      </View>
    </View>
  );

  const stepRenderers = [renderStep0, renderStep1, renderStep2];
  const isLastStep = step === STEPS.length - 1;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {renderDots()}

          <Animated.View
            style={[
              styles.card,
              { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
            ]}
          >
            <Text style={styles.stepTitle}>{STEPS[step].title}</Text>
            <Text style={styles.stepSubtitle}>{STEPS[step].subtitle}</Text>
            {stepRenderers[step]()}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </Animated.View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            {step > 0 && (
              <TouchableOpacity style={styles.backBtn} activeOpacity={0.8} onPress={handleBack}>
                <Text style={styles.backBtnText}>Geri</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.nextBtn, saving && styles.btnDisabled]}
              activeOpacity={0.85}
              onPress={isLastStep ? handleFinish : handleNext}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <Text style={styles.nextBtnText}>
                  {isLastStep ? 'Başlayalım!' : 'Devam'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {isLastStep && (
            <TouchableOpacity
              style={styles.skipFinish}
              activeOpacity={0.7}
              onPress={handleFinish}
              disabled={saving}
            >
              <Text style={styles.skipText}>Atla ve başla</Text>
            </TouchableOpacity>
          )}

          {step === 1 && (
            <TouchableOpacity
              style={styles.skipFinish}
              activeOpacity={0.7}
              onPress={handleNext}
            >
              <Text style={styles.skipText}>Varsayılanla devam et</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: palette.accent,
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: palette.border,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.accent,
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: palette.muted,
    marginBottom: 28,
    lineHeight: 22,
  },
  stepContent: {
    gap: 12,
  },
  input: {
    backgroundColor: palette.cardDark,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    color: palette.text,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputHalf: { flex: 1 },
  avatarSelectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 14,
    backgroundColor: palette.cardDark,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.border,
  },
  avatarSelectChipText: {
    color: palette.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  avatarPreviewRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPreviewCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: palette.cardDark,
    borderWidth: 2,
    borderColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPreviewEmoji: { fontSize: 44 },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  avatarOption: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.cardDark,
    borderWidth: 1,
    borderColor: palette.border,
  },
  avatarOptionActive: {
    borderColor: palette.accent,
    backgroundColor: 'rgba(0, 196, 204, 0.15)',
    borderWidth: 2,
  },
  avatarEmoji: { fontSize: 26 },
  errorText: {
    color: palette.danger,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 16 : 24,
    paddingTop: 12,
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  backBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
  },
  backBtnText: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  nextBtn: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.accent,
  },
  nextBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  btnDisabled: { opacity: 0.6 },
  skipFinish: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  skipText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '600',
  },
});
