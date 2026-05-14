import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette } from '../constants/theme';

type Props = {
  onNavigateToLogin: () => void;
  onSignUp: (email: string, password: string) => Promise<{ error: string | null }>;
};

export default function SignupScreen({ onNavigateToLogin, onSignUp }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async () => {
    setError('');
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      setError('E-posta ve şifre gerekli.');
      return;
    }
    if (password.length < 8) {
      setError('Şifre en az 8 karakter olmalı.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Şifre en az bir büyük harf içermeli.');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError('Şifre en az bir küçük harf içermeli.');
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError('Şifre en az bir rakam içermeli.');
      return;
    }
    if (/(.)\1{2,}/.test(password)) {
      setError('Şifre ardışık tekrarlayan karakter içeremez (örn: aaa, 111).');
      return;
    }
    if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) {
      setError('Şifre ardışık harf veya rakam dizisi içeremez (örn: 123, abc).');
      return;
    }
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    setLoading(true);
    const result = await onSignUp(trimmedEmail, password);
    setLoading(false);

    if (result.error) {
      if (result.error.includes('already registered')) {
        setError('Bu e-posta adresi zaten kayıtlı.');
      } else {
        setError(result.error);
      }
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.successContainer}>
          <Image
            source={require('../../assets/moono-profile.png')}
            style={[styles.logo, { alignSelf: 'center' }]}
            resizeMode="contain"
          />
          <Text style={[styles.successTitle, { textAlign: 'center' }]}>Kayıt Başarılı!</Text>
          <Text style={styles.successText}>
            E-posta adresine bir doğrulama bağlantısı gönderdik. Lütfen e-postanı kontrol et ve hesabını doğrula.
          </Text>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={onNavigateToLogin}
          >
            <Text style={styles.buttonText}>Giriş Ekranına Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/moono-profile.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brand}>MOONO</Text>
            <Text style={styles.tagline}>Hadi başlayalım, Ortak!</Text>
          </View>

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
              placeholder="Şifre Tekrar"
              placeholderTextColor={palette.muted}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              activeOpacity={0.85}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <Text style={styles.buttonText}>Kayıt Ol</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Zaten hesabın var mı?</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToLogin}>
              <Text style={styles.footerLink}> Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  brand: {
    fontSize: 36,
    fontWeight: '800',
    color: palette.text,
    letterSpacing: 4,
  },
  tagline: {
    fontSize: 15,
    color: palette.muted,
    marginTop: 6,
    fontWeight: '500',
  },
  form: {
    gap: 14,
  },
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
  error: {
    color: palette.danger,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    backgroundColor: palette.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    color: palette.muted,
    fontSize: 15,
  },
  footerLink: {
    color: palette.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.accent,
    marginTop: 16,
    marginBottom: 12,
  },
  successText: {
    color: palette.muted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
});
