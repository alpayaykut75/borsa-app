import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio, ResizeMode, Video } from 'expo-av';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

import type { RootStackParamList } from '../App';
import { fetchShorts } from '../src/services/shortsService';
import type { ShortCategory, ShortItem } from '../src/services/shortsService';
import {
  loadLikedShortIds,
  loadSavedShortIds,
  persistLikedShortIds,
  persistSavedShortIds,
} from '../src/services/shortsStorage';

const { height: windowHeight } = Dimensions.get('window');

type Short = ShortItem;

const CATEGORY_META: Record<ShortCategory, { label: string; icon: string; tint: string }> = {
  ogret: { label: 'Öğret', icon: 'school', tint: '#00C4CC' },
  ilham: { label: 'İlham', icon: 'flame', tint: '#F59E0B' },
  hikaye: { label: 'Hikaye', icon: 'book', tint: '#A78BFA' },
};

// Supabase erişilemez/boşsa kullanılacak yedek içerik.
const FALLBACK_SHORTS: Short[] = [
  // ───────────── TEST SLOTU ─────────────
  // Videonu eklemek için: videoUrl'e public linki yapıştır (Supabase Storage public URL).
  // title = kanca (0-2 sn), caption = açıklama metni, category = ogret/ilham/hikaye.
  // videoUrl boş kalırsa renkli placeholder gösterir (hata vermez).
  {
    id: 'test',
    category: 'ogret',
    title: 'Enflasyon paranı gizlice eriten hırsızdır',
    caption: 'Çözüm: üreten şirketlere ortak ol',
    videoUrl: 'https://tjxzpfkewlechcpsxull.supabase.co/storage/v1/object/public/lesson-audio/shorts_enflasyon.mp4',
    accent: '#0B3D40',
    lessonId: 55,
    lessonTitle: 'Enflasyon ve Yatırım',
    likeCount: 0,
  },
  // ──────────────────────────────────────
  {
    id: 's1',
    category: 'ogret',
    title: 'Hisse almak = ortak olmak',
    caption: 'Ortak, hisse aldığında şirkete küçük bir ortak olursun. Fiyat değil, ortaklık değeri.',
    accent: '#0B3D40',
    lessonId: 28,
    lessonTitle: 'Hisse Senedi Nedir?',
    likeCount: 1280,
  },
  {
    id: 's2',
    category: 'ilham',
    title: 'Bugün başla, mükemmeli bekleme',
    caption: 'En iyi zaman dünmüş. İkincisi bugün. Küçük başla, sistemi kur.',
    accent: '#4A2C00',
    likeCount: 940,
  },
  {
    id: 's3',
    category: 'hikaye',
    title: 'Buffett 11 yaşında ilk hissesini aldı',
    caption: 'Erken başlamak değil, uzun süre kalmak kazandırdı. Sabır en büyük bileşik faiz.',
    accent: '#2E1A47',
    likeCount: 3400,
  },
  {
    id: 's4',
    category: 'ogret',
    title: 'Endeks borsanın hava durumudur',
    caption: 'BIST 100 yükseldi diye senin hissen yükselmek zorunda değil. Endeks ortalama, sen kendi bahçene bak.',
    seriesLabel: 'Bölüm 1',
    accent: '#08323A',
    lessonId: 31,
    lessonTitle: 'Endeksler ve BIST 100',
    likeCount: 760,
  },
  {
    id: 's5',
    category: 'ilham',
    title: 'Panik satışı en pahalı alışkanlık',
    caption: 'Ekran kırmızıyken karar verme. Plan varsa kriz, fırsattır.',
    accent: '#3A1212',
    likeCount: 1510,
  },
  {
    id: 's6',
    category: 'ogret',
    title: 'Fiyatı belirleyen görünmez terazi',
    caption: 'Alıcı istekliyse fiyat yukarı, satıcı çoksa aşağı. Hepsi arz ve talep.',
    accent: '#10243F',
    lessonId: 32,
    lessonTitle: 'Arz, Talep ve Fiyat',
    likeCount: 620,
  },
];

type ShortsNav = NavigationProp<RootStackParamList>;

function ShortCard({
  item,
  height,
  isActive,
  screenFocused,
  isSaved,
  isLiked,
  onToggleSave,
  onToggleLike,
  onOpenLesson,
}: {
  item: Short;
  height: number;
  isActive: boolean;
  screenFocused: boolean;
  isSaved: boolean;
  isLiked: boolean;
  onToggleSave: () => void;
  onToggleLike: () => void;
  onOpenLesson: () => void;
}) {
  const videoRef = useRef<Video>(null);
  const [muted, setMuted] = useState(false);
  const meta = CATEGORY_META[item.category];
  const shouldPlay = isActive && screenFocused;

  useEffect(() => {
    if (!shouldPlay) {
      videoRef.current?.pauseAsync().catch(() => {});
    }
  }, [shouldPlay]);

  // Tab veya ders ekranına çıkınca sıfırla — geri dönünce Instagram gibi baştan başlar.
  useEffect(() => {
    if (!screenFocused) {
      videoRef.current?.pauseAsync().catch(() => {});
      videoRef.current?.setPositionAsync(0).catch(() => {});
    }
  }, [screenFocused]);

  return (
    <View style={[styles.card, { height, backgroundColor: item.accent }]}>
      {item.videoUrl ? (
        <TouchableOpacity
          activeOpacity={1}
          style={StyleSheet.absoluteFill}
          onPress={() => setMuted((m) => !m)}
        >
          <Video
            ref={videoRef}
            source={{ uri: item.videoUrl }}
            style={StyleSheet.absoluteFill}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay={shouldPlay}
            isMuted={muted}
          />
          <View style={styles.muteBadge}>
            <Ionicons name={muted ? 'volume-mute' : 'volume-high'} size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholderWrap}>
          <Ionicons name={meta.icon} size={64} color="rgba(255,255,255,0.18)" />
          <Text style={styles.placeholderText}>Video burada oynayacak</Text>
        </View>
      )}

      {/* Okunabilirlik için alt karartma */}
      <View style={styles.bottomScrim} pointerEvents="none" />

      {/* Sağ aksiyon rayı */}
      <View style={styles.actionRail}>
        <TouchableOpacity style={styles.actionButton} onPress={onToggleLike} activeOpacity={0.8}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={32}
            color={isLiked ? '#EF4444' : '#FFFFFF'}
          />
          <Text style={styles.actionLabel}>
            {formatCount(item.likeCount + (isLiked ? 1 : 0))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onToggleSave} activeOpacity={0.8}>
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={30}
            color={isSaved ? '#00C4CC' : '#FFFFFF'}
          />
          <Text style={styles.actionLabel}>Kaydet</Text>
        </TouchableOpacity>
      </View>

      {/* Alt metin bloğu */}
      <View style={styles.contentBlock}>
        <View style={styles.badgeRow}>
          <View style={[styles.categoryBadge, { borderColor: meta.tint }]}>
            <Ionicons name={meta.icon} size={13} color={meta.tint} />
            <Text style={[styles.categoryBadgeText, { color: meta.tint }]}>{meta.label}</Text>
          </View>
          {!!item.seriesLabel && (
            <View style={styles.seriesBadge}>
              <Text style={styles.seriesBadgeText}>{item.seriesLabel}</Text>
            </View>
          )}
          <View style={styles.moonoBadge}>
            <Ionicons name="sparkles" size={12} color="#00C4CC" />
            <Text style={styles.moonoBadgeText}>Moono</Text>
          </View>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.caption}>{item.caption}</Text>

        {!!item.lessonId && (
          <TouchableOpacity style={styles.lessonBridge} onPress={onOpenLesson} activeOpacity={0.85}>
            <Ionicons name="play-circle" size={18} color="#000000" />
            <Text style={styles.lessonBridgeText}>
              {item.lessonTitle ? `${item.lessonTitle} dersini aç` : 'Bu konuyu derste öğren'}
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#000000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function ShortsScreen() {
  const navigation = useNavigation<ShortsNav>();
  const screenFocused = useIsFocused();
  const [shorts, setShorts] = useState<Short[]>(FALLBACK_SHORTS);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<string>(FALLBACK_SHORTS[0]?.id ?? '');
  const [tab, setTab] = useState<'foryou' | 'saved'>('foryou');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // iOS sessiz modda bile ses çalsın
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    }).catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([loadSavedShortIds(), loadLikedShortIds()])
      .then(([saved, liked]) => {
        if (cancelled) return;
        if (saved.size > 0) setSavedIds(saved);
        if (liked.size > 0) setLikedIds(liked);
      })
      .catch(() => {
        /* yerel veri yoksa boş başla */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchShorts()
      .then((items) => {
        if (!cancelled && items.length > 0) {
          setShorts(items);
          setActiveId(items[0].id);
        }
      })
      .catch(() => {
        // Sessizce yedek içerikte kal
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && h !== containerHeight) setContainerHeight(h);
  };

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80 }).current;
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const first = viewableItems[0];
    if (first?.item) setActiveId((first.item as Short).id);
  }).current;

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      persistSavedShortIds(next);
      return next;
    });
  }, []);

  const toggleLike = useCallback((id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      persistLikedShortIds(next);
      return next;
    });
  }, []);

  const openLesson = useCallback(
    (item: Short) => {
      if (!item.lessonId) return;
      navigation.navigate('Lesson', {
        lessonId: item.lessonId,
        lessonTitle: item.lessonTitle,
      });
    },
    [navigation],
  );

  const data = tab === 'saved' ? shorts.filter((s) => savedIds.has(s.id)) : shorts;
  const pageHeight = containerHeight ?? windowHeight;

  return (
    <View style={styles.container} onLayout={onLayout}>
      <StatusBar style="light" />

      {/* Üst sekmeler: Sana Özel / Kaydedilenler */}
      <View style={styles.topTabs} pointerEvents="box-none">
        <TouchableOpacity onPress={() => setTab('foryou')} activeOpacity={0.8}>
          <Text style={[styles.topTabText, tab === 'foryou' && styles.topTabActive]}>Sana Özel</Text>
        </TouchableOpacity>
        <Text style={styles.topTabDivider}>|</Text>
        <TouchableOpacity onPress={() => setTab('saved')} activeOpacity={0.8}>
          <Text style={[styles.topTabText, tab === 'saved' && styles.topTabActive]}>Kaydedilenler</Text>
        </TouchableOpacity>
      </View>

      {containerHeight != null && data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ShortCard
              item={item}
              height={pageHeight}
              isActive={item.id === activeId}
              screenFocused={screenFocused}
              isSaved={savedIds.has(item.id)}
              isLiked={likedIds.has(item.id)}
              onToggleSave={() => toggleSave(item.id)}
              onToggleLike={() => toggleLike(item.id)}
              onOpenLesson={() => openLesson(item)}
            />
          )}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          snapToInterval={pageHeight}
          snapToAlignment="start"
          decelerationRate="fast"
          getItemLayout={(_, index) => ({
            length: pageHeight,
            offset: pageHeight * index,
            index,
          })}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      )}

      {containerHeight != null && data.length === 0 && (
        <View style={[styles.emptyState, { height: pageHeight }]}>
          <Ionicons name="bookmark-outline" size={48} color="#8A8A8A" />
          <Text style={styles.emptyTitle}>Henüz kaydettiğin short yok</Text>
          <Text style={styles.emptyText}>Beğendiğin videoları kaydet, burada toplansın.</Text>
        </View>
      )}
    </View>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')}B`;
  return String(n);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topTabs: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  topTabText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.55)',
  },
  topTabActive: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 6,
  },
  topTabDivider: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 14,
  },
  card: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  placeholderWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  placeholderText: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 320,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  muteBadge: {
    position: 'absolute',
    top: 110,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRail: {
    position: 'absolute',
    right: 12,
    bottom: 150,
    alignItems: 'center',
    gap: 22,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  contentBlock: {
    paddingHorizontal: 18,
    paddingRight: 70,
    paddingBottom: 28,
    gap: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  seriesBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  seriesBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  moonoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,196,204,0.12)',
  },
  moonoBadgeText: {
    color: '#00C4CC',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
  caption: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    lineHeight: 21,
  },
  lessonBridge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#00C4CC',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  lessonBridgeText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 10,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyText: {
    color: '#8A8A8A',
    fontSize: 14,
    textAlign: 'center',
  },
});
