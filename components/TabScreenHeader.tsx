import { Image, StyleSheet, Text, View, type ImageSourcePropType, type ReactNode } from 'react-native';

const NEON_CYAN = '#00C4CC';

export const TAB_HEADER_HORIZONTAL = 20;
export const TAB_HEADER_AVATAR_SIZE = 56;

type TabScreenHeaderProps = {
  title: string;
  subtitle?: string;
  /** Üçüncü satır (ör. Piyasa 08:30 notu) */
  hint?: string;
  avatarEmoji?: string;
  avatarPhotoUri?: string | null;
  avatarImage?: ImageSourcePropType;
  /** Moono profil fotoğrafı kırpması */
  moonoAvatarCrop?: boolean;
  trailing?: ReactNode;
};

export default function TabScreenHeader({
  title,
  subtitle,
  hint,
  avatarEmoji,
  avatarPhotoUri,
  avatarImage,
  moonoAvatarCrop = false,
  trailing,
}: TabScreenHeaderProps) {
  const showEmoji = !avatarPhotoUri && !avatarImage && avatarEmoji;

  return (
    <View style={styles.header}>
      <View style={styles.main}>
        <View style={styles.avatarContainer}>
          {avatarPhotoUri ? (
            <Image source={{ uri: avatarPhotoUri }} style={styles.avatarFill} resizeMode="cover" />
          ) : avatarImage ? (
            <Image
              source={avatarImage}
              style={[styles.avatarFill, moonoAvatarCrop && styles.avatarMoonoCrop]}
              resizeMode="cover"
            />
          ) : showEmoji ? (
            <Text style={styles.avatarEmoji}>{avatarEmoji}</Text>
          ) : null}
        </View>
        <View style={styles.textCol}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
          {hint ? (
            <Text style={styles.hint} numberOfLines={2}>
              {hint}
            </Text>
          ) : null}
        </View>
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: TAB_HEADER_HORIZONTAL,
    paddingTop: 12,
    paddingBottom: 32,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  avatarContainer: {
    marginRight: 16,
    width: TAB_HEADER_AVATAR_SIZE,
    height: TAB_HEADER_AVATAR_SIZE,
    borderRadius: TAB_HEADER_AVATAR_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: NEON_CYAN,
    backgroundColor: '#0F0F0F',
    overflow: 'hidden',
  },
  avatarFill: {
    width: '100%',
    height: '100%',
  },
  avatarMoonoCrop: {
    transform: [{ scale: 1.28 }, { translateY: 3 }],
  },
  avatarEmoji: {
    fontSize: 28,
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#888888',
    fontSize: 16,
    fontWeight: '500',
  },
  hint: {
    color: NEON_CYAN,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  trailing: {
    marginLeft: 8,
  },
});
