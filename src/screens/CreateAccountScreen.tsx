import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

import type { RootStackParamList } from '../../App';
import { palette } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

/** Kayıt ekranıyla aynı şifre kuralları. Hata yoksa null döner. */
function validatePassword(password: string, confirm: string): string | null {
  if (password.length < 8) return 'Şifre en az 8 karakter olmalı.';
  if (!/[A-Z]/.test(password)) return 'Şifre en az bir büyük harf içermeli.';
  if (!/[a-z]/.test(password)) return 'Şifre en az bir küçük harf içermeli.';
  if (!/[0-9]/.test(password)) return 'Şifre en az bir rakam içermeli.';
  if (password !== confirm) return 'Şifreler eşleşmiyor.';
  return null;
}

export default function CreateAccountScreen({ route, navigation }: Props) {
  const required = route.params?.required ?? false;
  const { upgradeGuest, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const close = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate('Main');
  };

  const handleCreate = async () => {
    setError('');
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError('Geçerli bir e-posta adresi gir.');
      return;
    }
    const pwError = validatePassword(password, confirm);
    if (pwError) {
      setError(pwError);
      return;
    }

    setLoading(true);
    const result = await upgradeGuest(trimmedEmail, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.needsEmailConfirmation) {
      Alert.alert(
        'E-postanı kontrol et',
        'Sana bir onay bağlantısı gönderdik. Bağlantıya tıkladıktan sonra hesabın hazır olacak.',
        [{ text: 'Tamam', onPress: close }],
      );
      return;
    }

    // Hesap kalıcı oldu. Profilde ad yoksa uygulama şimdi kısa tanışma formunu açar.
    close();
    Alert.alert(
      'Hesabın hazır, Ortak!',
      'İlerlemen hesabına kaydedildi, kaldığın yerden devam edebilirsin.',
    );
  };

  const handleHaveAccount = () => {
    Alert.alert(
      'Mevcut hesabına giriş yap',
      'Misafir olarak yaptığın ilerleme bu hesaba taşınmaz. Yine de giriş ekranına geçmek istiyor musun?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        { text: 'Giriş Ekranına Geç', style: 'destructive', onPress: () => signOut() },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={close} hitSlop={12} accessibilityLabel="Kapat">
            <Ionicons name="close" size={26} color={palette.muted} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.iconWrap}>
            <Ionicons name="shield-checkmark-outline" size={34} color={palette.accent} />
          </View>
          <Text style={styles.title}>
            {required ? 'Devam etmek için hesabını oluştur' : 'İlerlemen kaybolmasın'}
          </Text>
          <Text style={styles.subtitle}>
            {required
              ? 'İlk 5 dersi tamamladın, harikasın Ortak! Bundan sonrası için ücretsiz bir hesap gerekiyor. Şimdiye kadarki tüm ilerlemen hesabına aynen taşınır.'
              : 'Şu an misafirsin. Hesap oluşturursan ilerlemen güvende olur, telefon değiştirsen bile kaldığın yerden devam edersin.'}
          </Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="E-posta"
              placeholderTextColor={palette.muted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
            />
            <TextInput
              style={styles.input}
              placeholder="Şifre (en az 8 karakter, büyük+küçük+rakam)"
              placeholderTextColor={palette.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
            />
            <TextInput
              style={styles.input}
              placeholder="Şifre tekrar"
              placeholderTextColor={palette.muted}
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              activeOpacity={0.85}
              onPress={handleCreate}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <Text style={styles.buttonText}>Hesabımı Oluştur</Text>
              )}
            </TouchableOpacity>

            {!required && (
              <TouchableOpacity style={styles.linkButton} activeOpacity={0.7} onPress={close}>
                <Text style={styles.mutedLink}>Şimdi değil</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Zaten hesabın var mı?</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={handleHaveAccount}>
              <Text style={styles.footerLink}> Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  flex: { flex: 1 },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20, paddingTop: 8 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 28, paddingBottom: 40, paddingTop: 12 },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: palette.accent,
    backgroundColor: 'rgba(0, 196, 204, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: '800', color: palette.text, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 15, lineHeight: 22, color: palette.muted, textAlign: 'center', marginBottom: 28 },
  form: { gap: 14 },
  input: {
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    color: palette.text,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  error: { color: palette.danger, fontSize: 14, textAlign: 'center', fontWeight: '500' },
  button: {
    backgroundColor: palette.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#000000', fontSize: 17, fontWeight: '700' },
  linkButton: { alignItems: 'center', paddingVertical: 8 },
  mutedLink: { color: palette.muted, fontSize: 15, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  footerText: { color: palette.muted, fontSize: 15 },
  footerLink: { color: palette.accent, fontSize: 15, fontWeight: '700' },
});
