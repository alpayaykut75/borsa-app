import { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { useSfx } from '../src/hooks/useSfx';

const palette = {
  background: '#000000',
  text: '#FFFFFF',
  muted: '#888888',
  card: '#1A1A1A',
  border: '#333333',
  accent: '#00C4CC',
};

const PROFILE_FORM_KEY = 'moono_profile_form';
const PROFILE_AVATAR_KEY = 'moono_profile_avatar';
const levelImages = [
  require('../assets/levels/level1-cirak.png'),
  require('../assets/levels/level2-caylak.png'),
  require('../assets/levels/level3-analist.png'),
  require('../assets/levels/level4-stratejist.png'),
  require('../assets/levels/level5-profesyonel.png'),
];
const avatarOptions = ['🙂', '😎', '🤓', '🚀', '🎯', '🐂', '🔥', '🌟', '🧠', '💼'];

type ProfileForm = {
  firstName: string;
  lastName: string;
  country: string;
  age: string;
  gender: string;
};

export default function ProfileScreen() {
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
  const [selectedAvatar, setSelectedAvatar] = useState('🙂');
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const { isSfxEnabled, setSfxEnabled } = useSfx();

  useEffect(() => {
    setSfxEnabledState(isSfxEnabled);
  }, [isSfxEnabled]);

  useEffect(() => {
    const loadProfileForm = async () => {
      try {
        const saved = await AsyncStorage.getItem(PROFILE_FORM_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as ProfileForm;
          setProfileForm(parsed);
        }

        const savedAvatar = await AsyncStorage.getItem(PROFILE_AVATAR_KEY);
        if (savedAvatar) {
          setSelectedAvatar(savedAvatar);
        }
      } catch (error) {
        console.warn('Profile form load error:', error);
      }
    };

    loadProfileForm();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: completedData }, { data: lessonsData }, { data: unitsData }] = await Promise.all([
        supabase
          .from('user_progress')
          .select('lesson_id')
          .eq('user_id', user.id)
          .eq('is_completed', true),
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

  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggleSfx = async (value: boolean) => {
    setSfxEnabledState(value);
    await setSfxEnabled(value);
  };

  const handleSaveProfile = async () => {
    try {
      await AsyncStorage.setItem(PROFILE_FORM_KEY, JSON.stringify(profileForm));
      await AsyncStorage.setItem(PROFILE_AVATAR_KEY, selectedAvatar);
      setIsProfileEditorOpen(false);
      setIsAvatarPickerOpen(false);
      Alert.alert('Kaydedildi', 'Profil bilgileri kaydedildi.');
    } catch (error) {
      Alert.alert('Hata', 'Profil kaydedilirken bir sorun oluştu.');
    }
  };

  const levelImage = levelImages[Math.min(Math.max(currentLevel - 1, 0), levelImages.length - 1)];
  const normalizedLevelTitle = currentLevelTitle.replace(/^\s*Seviye\s*\d+\s*:\s*/i, '').trim() || currentLevelTitle;
  const fullName = `${profileForm.firstName} ${profileForm.lastName}`.trim() || 'Ortak';
  const headerMeta = [profileForm.country || '-', profileForm.age ? `${profileForm.age} yaş` : '-', profileForm.gender || '-']
    .join(' • ');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.userAvatarFrame}>
            <Text style={styles.userAvatarEmoji}>{selectedAvatar}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title} numberOfLines={1}>{fullName}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{headerMeta}</Text>
          </View>
          <TouchableOpacity style={styles.editIconButton} activeOpacity={0.8} onPress={() => setIsProfileEditorOpen((prev) => !prev)}>
            <Ionicons name="pencil" size={18} color={palette.accent} />
          </TouchableOpacity>
        </View>

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

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Genel İlerleme</Text>
          <Text style={styles.cardValue}>
            {completedCount}/{totalCount || 0} ders • %{completionRate}
          </Text>
        </View>

        {isProfileEditorOpen && (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Profil Bilgileri</Text>
            <View style={styles.formGrid}>
              <TextInput
                style={styles.input}
                placeholder="Ad"
                placeholderTextColor="#666"
                value={profileForm.firstName}
                onChangeText={(text) => setProfileForm((prev) => ({ ...prev, firstName: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Soyad"
                placeholderTextColor="#666"
                value={profileForm.lastName}
                onChangeText={(text) => setProfileForm((prev) => ({ ...prev, lastName: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Ülke"
                placeholderTextColor="#666"
                value={profileForm.country}
                onChangeText={(text) => setProfileForm((prev) => ({ ...prev, country: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Yaş"
                placeholderTextColor="#666"
                value={profileForm.age}
                onChangeText={(text) => setProfileForm((prev) => ({ ...prev, age: text.replace(/[^0-9]/g, '') }))}
                keyboardType="numeric"
                maxLength={3}
              />
              <TextInput
                style={styles.input}
                placeholder="Cinsiyet"
                placeholderTextColor="#666"
                value={profileForm.gender}
                onChangeText={(text) => setProfileForm((prev) => ({ ...prev, gender: text }))}
              />
            </View>

            <View style={styles.cardHeaderRowSecondary}>
                <Text style={styles.cardLabel}>Avatar Seç</Text>
              <TouchableOpacity activeOpacity={0.75} onPress={() => setIsAvatarPickerOpen((prev) => !prev)}>
                  <Text style={styles.linkText}>{isAvatarPickerOpen ? 'Gizle' : 'Seçenekler'}</Text>
              </TouchableOpacity>
            </View>

            {isAvatarPickerOpen && (
              <View style={styles.avatarOptionRow}>
                {avatarOptions.map((avatar) => (
                  <TouchableOpacity
                    key={avatar}
                    activeOpacity={0.85}
                    style={[
                      styles.avatarOption,
                      selectedAvatar === avatar && styles.avatarOptionActive,
                    ]}
                    onPress={() => setSelectedAvatar(avatar)}
                  >
                    <Text style={styles.avatarOptionText}>{avatar}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.settingHint}>Kendi fotoğraf yükleme seçeneği bir sonraki adımda eklenebilir.</Text>
            <TouchableOpacity style={styles.saveButton} activeOpacity={0.85} onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Profili Kaydet</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.cardLabelFixed}>SES EFEKTLERİ</Text>
              <Text style={styles.settingHint}>Doğru/yanlış, kilit açma ve tamamlama sesleri</Text>
            </View>
            <Switch
              value={sfxEnabled}
              onValueChange={handleToggleSfx}
              trackColor={{ false: '#3A3A3A', true: '#00C4CC' }}
              thumbColor={sfxEnabled ? '#FFFFFF' : '#B0B0B0'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingVertical: 24,
    paddingBottom: 32,
  },
  headerText: {
    marginLeft: 14,
    flex: 1,
  },
  userAvatarFrame: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F0F0F',
  },
  userAvatarEmoji: {
    fontSize: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 2,
  },
  subtitle: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  editIconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111111',
  },
  card: {
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
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
  cardHeaderRowSecondary: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkText: {
    color: palette.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  formGrid: {
    marginTop: 10,
    gap: 10,
  },
  input: {
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 12,
    color: palette.text,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
  },
  avatarOptionRow: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  avatarOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: palette.border,
  },
  avatarOptionActive: {
    borderColor: palette.accent,
    backgroundColor: 'rgba(0, 196, 204, 0.12)',
  },
  avatarOptionText: {
    fontSize: 20,
  },
  saveButton: {
    marginTop: 14,
    backgroundColor: palette.accent,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '700',
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
});

