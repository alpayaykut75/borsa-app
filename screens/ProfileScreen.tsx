import { useEffect, useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabScreenHeader from '../components/TabScreenHeader';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import { useSfx } from '../src/hooks/useSfx';
import { useAuth } from '../src/contexts/AuthContext';
import { usePremium } from '../src/contexts/PremiumContext';
import LegalScreen from './LegalScreen';

const palette = {
  background: '#000000',
  text: '#FFFFFF',
  muted: '#8A8A8A',
  card: '#1A1A1A',
  cardDark: '#0F0F0F',
  border: '#333333',
  accent: '#00C4CC',
  danger: '#EF4444',
};

import {
  cacheProfileAvatar,
  cacheProfilePhoto,
  PROFILE_PHOTO_KEY,
} from '../src/constants/profileStorage';
import {
  DEFAULT_PROFILE_AVATAR_ID,
  getProfileAvatarSource,
  normalizeProfileAvatarId,
} from '../src/constants/avatars';
import ProfileAvatarPicker from '../components/ProfileAvatarPicker';
import AppButton from '../components/AppButton';
import { neutrals, spacing } from '../src/constants/theme';

const levelImages = [
  require('../assets/levels/level1-cirak.png'),
  require('../assets/levels/level2-caylak.png'),
  require('../assets/levels/level3-analist.png'),
  require('../assets/levels/level4-stratejist.png'),
  require('../assets/levels/level5-profesyonel.png'),
];
type ProfileForm = {
  firstName: string;
  lastName: string;
  country: string;
  age: string;
  gender: string;
};

export default function ProfileScreen() {
  const { signOut, session } = useAuth();
  const { isPremium, openPaywall, restorePurchases, isPurchasing } = usePremium();
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentLevelTitle, setCurrentLevelTitle] = useState('Çırak');
  const [sfxEnabled, setSfxEnabledState] = useState(true);
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    firstName: '',
    lastName: '',
    country: '',
    age: '',
    gender: '',
  });
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_PROFILE_AVATAR_ID);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Password change
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [showLegal, setShowLegal] = useState(false);

  const { isSfxEnabled, setSfxEnabled } = useSfx();

  useEffect(() => {
    setSfxEnabledState(isSfxEnabled);
  }, [isSfxEnabled]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from('profiles')
            .select('first_name, last_name, country, age, gender, avatar')
            .eq('id', user.id)
            .single();
          if (data) {
            setProfileForm({
              firstName: data.first_name || '',
              lastName: data.last_name || '',
              country: data.country || '',
              age: data.age?.toString() || '',
              gender: data.gender || '',
            });
            if (data.avatar) {
              const avatarId = normalizeProfileAvatarId(data.avatar);
              setSelectedAvatar(avatarId);
              await cacheProfileAvatar(avatarId);
            }
          }
        }
        const savedPhoto = await AsyncStorage.getItem(PROFILE_PHOTO_KEY);
        if (savedPhoto) setProfilePhoto(savedPhoto);
      } catch (error) {
        console.warn('Profile load error:', error);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: completedData }, { data: lessonsData }, { data: unitsData }] = await Promise.all([
        supabase.from('user_progress').select('lesson_id').eq('user_id', user.id).eq('is_completed', true),
        supabase.from('lessons').select('id'),
        supabase.from('units').select('id, title, order_index').order('order_index', { ascending: true }),
      ]);

      setCompletedCount(completedData?.length ?? 0);
      setTotalCount(lessonsData?.length ?? 0);

      if (unitsData && unitsData.length > 0) {
        const { data: allLessonsByUnit } = await supabase.from('lessons').select('id, unit_id');
        const completedIds = new Set<number>((completedData ?? []).map((item) => item.lesson_id));
        const lessonsMap: Record<number, number[]> = {};
        (allLessonsByUnit ?? []).forEach((lesson: any) => {
          lessonsMap[lesson.unit_id] = lessonsMap[lesson.unit_id] || [];
          lessonsMap[lesson.unit_id].push(lesson.id);
        });

        const firstIncompleteIndex = unitsData.findIndex((unit: any) => {
          const ids = lessonsMap[unit.id] ?? [];
          if (ids.length === 0) return true;
          return ids.some((lessonId) => !completedIds.has(lessonId));
        });

        const activeIndex = firstIncompleteIndex === -1 ? unitsData.length - 1 : firstIncompleteIndex;
        setCurrentLevel(activeIndex + 1);
        setCurrentLevelTitle(unitsData[activeIndex]?.title || 'Çırak');
      }
    };
    fetchProfileData();
  }, []);

  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggleSfx = async (value: boolean) => {
    setSfxEnabledState(value);
    await setSfxEnabled(value);
  };

  const handleSaveProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Kullanıcı bulunamadı');

      const { error: dbError } = await supabase.from('profiles').upsert({
        id: user.id,
        first_name: profileForm.firstName.trim() || null,
        last_name: profileForm.lastName.trim() || null,
        country: profileForm.country.trim() || null,
        age: profileForm.age ? parseInt(profileForm.age, 10) : null,
        gender: profileForm.gender.trim() || null,
        avatar: selectedAvatar,
        updated_at: new Date().toISOString(),
      });

      if (dbError) throw dbError;

      await cacheProfileAvatar(selectedAvatar);
      await cacheProfilePhoto(profilePhoto);
      setIsEditMode(false);
      setIsPasswordSectionOpen(false);
      setNewPassword('');
      setConfirmNewPassword('');
      setPasswordError('');
    } catch (error) {
      Alert.alert('Hata', 'Profil kaydedilirken bir sorun oluştu.');
    }
  };

  const handlePickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Fotoğraf seçebilmek için galeri erişim izni gerekli.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Fotoğraf çekebilmek için kamera erişim izni gerekli.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    if (!newPassword) { setPasswordError('Yeni şifre gerekli.'); return; }
    if (newPassword.length < 8) { setPasswordError('Şifre en az 8 karakter olmalı.'); return; }
    if (!/[A-Z]/.test(newPassword)) { setPasswordError('Şifre en az bir büyük harf içermeli.'); return; }
    if (!/[a-z]/.test(newPassword)) { setPasswordError('Şifre en az bir küçük harf içermeli.'); return; }
    if (!/[0-9]/.test(newPassword)) { setPasswordError('Şifre en az bir rakam içermeli.'); return; }
    if (newPassword !== confirmNewPassword) { setPasswordError('Şifreler eşleşmiyor.'); return; }

    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordLoading(false);

    if (error) {
      setPasswordError(error.message.includes('same password') ? 'Yeni şifre mevcut şifreden farklı olmalı.' : error.message);
    } else {
      setNewPassword('');
      setConfirmNewPassword('');
      setPasswordError('');
      setIsPasswordSectionOpen(false);
      Alert.alert('Başarılı', 'Şifren güncellendi.');
    }
  };

  const levelImage = levelImages[Math.min(Math.max(currentLevel - 1, 0), levelImages.length - 1)];
  const normalizedLevelTitle = currentLevelTitle.replace(/^\s*Seviye\s*\d+\s*:\s*/i, '').trim() || currentLevelTitle;
  const fullName = `${profileForm.firstName} ${profileForm.lastName}`.trim() || 'Ortak';
  const renderAvatar = (size: number, borderSize: number) => {
    if (profilePhoto) {
      return (
        <View style={[styles.avatarFrame, { width: size, height: size, borderRadius: size / 2, borderWidth: borderSize }]}>
          <Image source={{ uri: profilePhoto }} style={styles.avatarImage} />
        </View>
      );
    }
    return (
      <View style={[styles.avatarFrame, { width: size, height: size, borderRadius: size / 2, borderWidth: borderSize }]}>
        <Image
          source={getProfileAvatarSource(selectedAvatar)}
          style={styles.avatarImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  const handleSelectAvatar = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    setProfilePhoto(null);
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => {
      const next = !prev;
      if (!next) {
        setPasswordError('');
      }
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" />
      <TabScreenHeader
        title={fullName}
        subtitle="Kişisel alanın"
        avatarImage={profilePhoto ? undefined : getProfileAvatarSource(selectedAvatar)}
        avatarPhotoUri={profilePhoto}
        moonoAvatarCrop
        trailing={(
          <TouchableOpacity
            style={styles.headerIconButton}
            activeOpacity={0.85}
            onPress={toggleEditMode}
          >
            <Ionicons name={isEditMode ? 'close' : 'pencil'} size={24} color={palette.accent} />
          </TouchableOpacity>
        )}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Düzenleme Modu */}
        {isEditMode && (
          <View style={styles.editCard}>
            {/* Avatar Bölümü */}
            <View style={styles.avatarToolbar}>
              {profilePhoto ? (
                renderAvatar(56, 2)
              ) : (
                <View style={styles.photoActionButton}>
                  <Ionicons name="sparkles-outline" size={18} color={palette.accent} />
                  <Text style={styles.photoActionText}>Avatar seç</Text>
                </View>
              )}
              <TouchableOpacity style={styles.photoActionButton} activeOpacity={0.8} onPress={handleTakePhoto}>
                <Ionicons name="camera-outline" size={20} color={palette.accent} />
                <Text style={styles.photoActionText}>Kamera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoActionButton} activeOpacity={0.8} onPress={handlePickPhoto}>
                <Ionicons name="images-outline" size={20} color={palette.accent} />
                <Text style={styles.photoActionText}>Galeri</Text>
              </TouchableOpacity>
              {profilePhoto ? (
                <TouchableOpacity
                  style={styles.photoActionButton}
                  activeOpacity={0.8}
                  onPress={() => setProfilePhoto(null)}
                >
                  <Ionicons name="trash-outline" size={20} color={palette.danger} />
                  <Text style={[styles.photoActionText, { color: palette.danger }]}>Kaldır</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {!profilePhoto ? (
              <View style={styles.avatarGridSection}>
                <ProfileAvatarPicker
                  selectedId={selectedAvatar}
                  onSelect={handleSelectAvatar}
                  columnsPerRow={5}
                />
              </View>
            ) : null}

            {/* Kişisel Bilgiler */}
            <View style={styles.editSectionDivider} />
            <Text style={styles.editSectionTitle}>KİŞİSEL BİLGİLER</Text>
            <View style={styles.formGrid}>
              <View style={styles.formRow}>
                <TextInput style={[styles.input, styles.inputHalf]} placeholder="Ad" placeholderTextColor="#666" value={profileForm.firstName} onChangeText={(t) => setProfileForm((p) => ({ ...p, firstName: t }))} />
                <TextInput style={[styles.input, styles.inputHalf]} placeholder="Soyad" placeholderTextColor="#666" value={profileForm.lastName} onChangeText={(t) => setProfileForm((p) => ({ ...p, lastName: t }))} />
              </View>
              <TextInput style={styles.input} placeholder="Ülke" placeholderTextColor="#666" value={profileForm.country} onChangeText={(t) => setProfileForm((p) => ({ ...p, country: t }))} />
              <View style={styles.formRow}>
                <TextInput style={[styles.input, styles.inputHalf]} placeholder="Yaş" placeholderTextColor="#666" value={profileForm.age} onChangeText={(t) => setProfileForm((p) => ({ ...p, age: t.replace(/[^0-9]/g, '') }))} keyboardType="numeric" maxLength={3} />
                <TextInput style={[styles.input, styles.inputHalf]} placeholder="Cinsiyet" placeholderTextColor="#666" value={profileForm.gender} onChangeText={(t) => setProfileForm((p) => ({ ...p, gender: t }))} />
              </View>
            </View>

            {/* Kaydet Butonu */}
            <AppButton
              title="Profili Kaydet"
              onPress={handleSaveProfile}
              variant="secondary"
              style={styles.saveButton}
            />
          </View>
        )}

        {!isEditMode && (
          <>
            {/* Hesap ve Güvenlik (öncelikli) */}
            <View style={styles.card}>
              <Text style={styles.cardLabelFixed}>HESAP VE GÜVENLİK</Text>
              {session?.user?.email ? (
                <Text style={styles.emailText}>{session.user.email}</Text>
              ) : (
                <Text style={styles.settingHint}>Mail adresi bulunamadı.</Text>
              )}
              <TouchableOpacity
                style={styles.passwordToggle}
                activeOpacity={0.8}
                onPress={() => {
                  setIsPasswordSectionOpen((prev) => !prev);
                  setPasswordError('');
                  setNewPassword('');
                  setConfirmNewPassword('');
                }}
              >
                <View style={styles.passwordToggleLeft}>
                  <Ionicons name="key-outline" size={18} color={palette.accent} />
                  <Text style={styles.passwordToggleText}>Şifre Değiştir</Text>
                </View>
                <Ionicons name={isPasswordSectionOpen ? 'chevron-up' : 'chevron-down'} size={18} color={palette.muted} />
              </TouchableOpacity>

              {isPasswordSectionOpen && (
                <View style={styles.passwordForm}>
                  <TextInput style={styles.input} placeholder="Yeni Şifre" placeholderTextColor="#666" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
                  <TextInput style={styles.input} placeholder="Yeni Şifre Tekrar" placeholderTextColor="#666" value={confirmNewPassword} onChangeText={setConfirmNewPassword} secureTextEntry />
                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                  <TouchableOpacity
                    style={[styles.passwordSaveButton, passwordLoading && { opacity: 0.6 }]}
                    activeOpacity={0.85}
                    onPress={handleChangePassword}
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? (
                      <ActivityIndicator color={palette.accent} size="small" />
                    ) : (
                      <Text style={styles.passwordSaveText}>Şifreyi Güncelle</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Seviye Kartı */}
            <View style={styles.card}>
              <View style={styles.levelRow}>
                <View style={styles.levelBadgeLargeFrame}>
                  <Image source={levelImage} style={styles.levelBadgeImage} resizeMode="cover" />
                </View>
                <View style={styles.levelTextWrap}>
                  <Text style={styles.levelOverline}>SEVİYE {currentLevel}</Text>
                  <Text style={styles.levelTitle}>{normalizedLevelTitle}</Text>
                  <Text style={styles.levelHint}>Bu seviyede devam ediyorsun.</Text>
                </View>
              </View>
            </View>

            {/* İlerleme */}
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Genel İlerleme</Text>
              <Text style={styles.cardValue}>{completedCount}/{totalCount || 0} ders • %{completionRate}</Text>
            </View>

            {/* Premium */}
            <View style={styles.card}>
              <Text style={styles.cardLabelFixed}>{isPremium ? 'PREMİUM AKTİF' : 'ÜCRETSİZ SÜRÜM'}</Text>
              {!isPremium ? (
                <>
                  <Text style={styles.premiumHint}>
                    İlk 5 ders ücretsiz. 6. dersten sonra tüm dersler ve Moono asistanı açılır.
                  </Text>
                  <AppButton
                    title="Premium'a Geç"
                    onPress={() =>
                      openPaywall({
                        title: 'Premium ile devam et',
                        subtitle:
                          'İlk 5 ders ücretsiz. 6. dersten itibaren tüm dersler ve Moono asistanı Premium ile açılır.',
                      })
                    }
                    variant="secondary"
                    style={styles.premiumActionBtn}
                  />
                </>
              ) : (
                <Text style={styles.cardValue}>Aktif — tüm içerik açık</Text>
              )}
              <TouchableOpacity
                style={styles.premiumRestoreBtn}
                activeOpacity={0.7}
                onPress={restorePurchases}
                disabled={isPurchasing}
              >
                <Text style={styles.premiumRestoreText}>Satın Alımları Geri Yükle</Text>
              </TouchableOpacity>
            </View>

            {/* SFX */}
            <View style={styles.card}>
              <View style={styles.settingRow}>
                <View>
                  <Text style={styles.cardLabelFixed}>SES EFEKTLERİ</Text>
                  <Text style={styles.settingHint}>Doğru/yanlış, kilit açma ve tamamlama sesleri</Text>
                </View>
                <Switch
                  value={sfxEnabled}
                  onValueChange={handleToggleSfx}
                  trackColor={{ false: neutrals.switchTrackOff, true: '#00C4CC' }}
                  thumbColor={sfxEnabled ? '#FFFFFF' : neutrals.switchThumbOff}
                />
              </View>
            </View>

            {/* Yasal Bilgiler */}
            <TouchableOpacity
              style={styles.legalButton}
              activeOpacity={0.8}
              onPress={() => setShowLegal(true)}
            >
              <Ionicons name="document-text-outline" size={18} color={palette.muted} />
              <Text style={styles.legalButtonText}>Yasal Bilgiler</Text>
              <Ionicons name="chevron-forward" size={16} color={palette.muted} style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>

            {/* Çıkış */}
            <TouchableOpacity
              style={styles.signOutButton}
              activeOpacity={0.85}
              onPress={() => {
                Alert.alert('Çıkış Yap', 'Hesabından çıkış yapmak istediğine emin misin?', [
                  { text: 'Vazgeç', style: 'cancel' },
                  { text: 'Çıkış Yap', style: 'destructive', onPress: signOut },
                ]);
              }}
            >
              <Ionicons name="log-out-outline" size={20} color={palette.accent} />
              <Text style={styles.signOutText}>Çıkış Yap</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>Moono v1.0.0</Text>
          </>
        )}
      </ScrollView>

      <Modal visible={showLegal} animationType="slide" presentationStyle="pageSheet">
        <LegalScreen onClose={() => setShowLegal(false)} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  avatarFrame: {
    borderColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.cardDark,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },

  headerIconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },

  // Düzenleme kartı
  editCard: {
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.accent + '44',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  avatarToolbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  avatarGridSection: {
    marginTop: spacing.sm,
  },
  photoActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: palette.cardDark,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.border,
  },
  photoActionText: {
    color: palette.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  emojiSection: {
    marginTop: 14,
  },
  emojiLabel: {
    color: palette.muted,
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  avatarOptionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  avatarOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.cardDark,
    borderWidth: 1,
    borderColor: palette.border,
  },
  avatarOptionActive: {
    borderColor: palette.accent,
    backgroundColor: 'rgba(0, 196, 204, 0.12)',
  },
  avatarOptionText: {
    fontSize: 22,
  },
  editSectionDivider: {
    height: 1,
    backgroundColor: palette.border,
    marginVertical: 16,
  },
  editSectionTitle: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  formGrid: {
    gap: 10,
  },
  formRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    backgroundColor: palette.cardDark,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 12,
    color: palette.text,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputHalf: {
    flex: 1,
  },

  // Şifre bölümü
  passwordToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 4,
  },
  passwordToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  passwordToggleText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '600',
  },
  passwordForm: {
    gap: 10,
    marginTop: 8,
  },
  errorText: {
    color: palette.danger,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  passwordSaveButton: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.accent + '55',
    backgroundColor: palette.cardDark,
  },
  passwordSaveText: {
    color: palette.accent,
    fontSize: 14,
    fontWeight: '700',
  },

  saveButton: {
    marginTop: spacing.md,
    borderRadius: 12,
  },

  // Kartlar
  card: {
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 16,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  cardLabel: {
    color: palette.muted,
    fontSize: 13,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cardLabelFixed: {
    color: palette.muted,
    fontSize: 13,
    marginBottom: 6,
    letterSpacing: 0.4,
    fontWeight: '500',
  },
  cardValue: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '700',
  },
  premiumActionBtn: {
    marginTop: 12,
    borderRadius: 12,
  },
  premiumRestoreBtn: {
    marginTop: 8,
    alignItems: 'center',
    paddingVertical: 4,
  },
  premiumRestoreText: {
    color: palette.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  levelTextWrap: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  levelOverline: {
    color: palette.accent,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  levelTitle: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '700',
  },
  levelHint: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '500',
  },
  levelBadgeLargeFrame: {
    width: 112,
    height: 112,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
  },
  levelBadgeImage: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.12 }],
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingHint: {
    color: palette.muted,
    fontSize: 13,
    maxWidth: 250,
  },
  premiumHint: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  emailText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '500',
  },
  legalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
    borderRadius: 14,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
  },
  legalButtonText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '600',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: spacing.sm,
    marginTop: 4,
    marginBottom: spacing.sm,
    borderRadius: 14,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
  },
  signOutText: {
    color: palette.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  versionText: {
    color: palette.muted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.6,
  },
});
