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
import { MOONO_CHARACTER_AVATAR } from '../constants/avatars';

type Props = {
  onNavigateToSignUp: () => void;
  onNavigateToForgotPassword: () => void;
  onSignIn: (email: string, password: string) => Promise<{ error: string | null }>;
};

export default function LoginScreen({ onNavigateToSignUp, onNavigateToForgotPassword, onSignIn }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      setError('E-posta ve şifre gerekli.');
      return;
    }

    setLoading(true);
    const result = await onSignIn(trimmedEmail, password);
    setLoading(false);

    if (result.error) {
      if (result.error.includes('Invalid login credentials')) {
        setError('E-posta veya şifre hatalı.');
      } else {
        setError(result.error);
      }
    }
  };

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
              source={MOONO_CHARACTER_AVATAR}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brand}>MOONO</Text>
            <Text style={styles.tagline}>Finansal okuryazarlık ortağın</Text>
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
              placeholder="Şifre"
              placeholderTextColor={palette.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              textContentType="password"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              activeOpacity={0.85}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <Text style={styles.buttonText}>Giriş Yap</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              activeOpacity={0.7}
              onPress={onNavigateToForgotPassword}
            >
              <Text style={styles.linkText}>Şifremi Unuttum</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Hesabın yok mu?</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToSignUp}>
              <Text style={styles.footerLink}> Kayıt Ol</Text>
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
  linkButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  linkText: {
    color: palette.accent,
    fontSize: 14,
    fontWeight: '600',
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
});
