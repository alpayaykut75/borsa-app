import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

const ACCENT = '#00C4CC';

type Props = {
  uri: string;
  /** İlk kez oynatılınca çağrılır (ses adımındaki "dinledi mi" kontrolü için). */
  onStarted?: () => void;
};

const fmt = (ms: number) => {
  const t = Math.floor(ms / 1000);
  return `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, '0')}`;
};

/**
 * Ders sonu animasyonlu özet videosu (dikey 9:16).
 * Ders ekranında küçük önizleme; oynat'a basınca tam ekran açılır.
 * Sonuna kadar izlenince ya da sağ üstteki küçültme düğmesiyle ders ekranına döner.
 */
export default function LessonVideoSummary({ uri, onStarted }: Props) {
  const insets = useSafeAreaInsets();
  const previewRef = useRef<Video>(null);
  const fullRef = useRef<Video>(null);
  const startedRef = useRef(false);

  const [fullscreen, setFullscreen] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [position, setPosition] = useState(0); // kaldığı yer (ms)
  const [startAt, setStartAt] = useState(0); // tam ekran açılırken başlanacak yer (sabit kalmalı)
  const [duration, setDuration] = useState(0);
  const [finished, setFinished] = useState(false);
  const [full, setFull] = useState({ loaded: false, playing: false, buffering: false });

  const { width: ww, height: wh } = Dimensions.get('window');
  const height = Math.min(wh * 0.6, ((ww - 40) * 16) / 9);
  const width = (height * 9) / 16;

  // Adımdan çıkınca durdur.
  useEffect(() => {
    const p = previewRef.current;
    const f = fullRef.current;
    return () => {
      p?.pauseAsync().catch(() => {});
      f?.pauseAsync().catch(() => {});
    };
  }, []);

  // Önizleme her zaman kaldığı karede dursun.
  useEffect(() => {
    if (!fullscreen && previewLoaded) {
      previewRef.current?.setPositionAsync(finished ? 0 : position).catch(() => {});
    }
  }, [fullscreen, previewLoaded, finished, position]);

  const open = () => {
    const from = finished ? 0 : position;
    setStartAt(from);
    setPosition(from);
    setFinished(false);
    setFull({ loaded: false, playing: false, buffering: true });
    setFullscreen(true);
  };

  const close = () => {
    fullRef.current?.pauseAsync().catch(() => {});
    setFullscreen(false);
  };

  const onPreviewStatus = (s: AVPlaybackStatus) => {
    if (!s.isLoaded) return;
    if (!previewLoaded) setPreviewLoaded(true);
    if (s.durationMillis && !duration) setDuration(s.durationMillis);
  };

  const onFullStatus = (s: AVPlaybackStatus) => {
    if (!s.isLoaded) return;
    if (s.isPlaying && !startedRef.current) {
      startedRef.current = true;
      onStarted?.();
    }
    setFull({ loaded: true, playing: s.isPlaying, buffering: s.isBuffering && !s.isPlaying });
    if (s.durationMillis) setDuration(s.durationMillis);
    if (s.didJustFinish) {
      setFinished(true);
      setPosition(0);
      setFullscreen(false);
      return;
    }
    setPosition(s.positionMillis || 0);
  };

  const toggleFull = async () => {
    const v = fullRef.current;
    if (!v) return;
    try {
      if (full.playing) await v.pauseAsync();
      else await v.playAsync();
    } catch {
      // yok say
    }
  };

  const progress = duration > 0 ? position / duration : 0;
  const started = position > 0;

  return (
    <View style={styles.wrap}>
      {/* Ders ekranındaki önizleme */}
      <TouchableOpacity activeOpacity={0.9} onPress={open} style={[styles.frame, { width, height }]}>
        <Video
          ref={previewRef}
          source={{ uri }}
          style={StyleSheet.absoluteFill}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
          isMuted
          onPlaybackStatusUpdate={onPreviewStatus}
        />
        <View style={[styles.center, styles.dim]} pointerEvents="none">
          {!previewLoaded ? (
            <ActivityIndicator color={ACCENT} />
          ) : (
            <>
              <View style={styles.playCircle}>
                <Ionicons name={finished ? 'refresh' : 'play'} size={34} color="#000000" />
              </View>
              <Text style={styles.hint}>
                {finished ? 'Tekrar izle' : started ? 'Kaldığın yerden izle' : 'Özeti izle'}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>

      <View style={[styles.progressRow, { width }]}>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: `${(finished ? 1 : progress) * 100}%` }]} />
        </View>
        <Text style={styles.time}>
          {fmt(finished ? duration : position)} / {fmt(duration)}
        </Text>
      </View>

      {/* Tam ekran oynatıcı */}
      <Modal
        visible={fullscreen}
        animationType="fade"
        presentationStyle="fullScreen"
        supportedOrientations={['portrait']}
        onRequestClose={close}
      >
        <StatusBar hidden />
        <View style={styles.fullRoot}>
          <TouchableOpacity activeOpacity={1} onPress={toggleFull} style={StyleSheet.absoluteFill}>
            <Video
              ref={fullRef}
              source={{ uri }}
              style={StyleSheet.absoluteFill}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              positionMillis={startAt}
              progressUpdateIntervalMillis={250}
              onPlaybackStatusUpdate={onFullStatus}
            />
          </TouchableOpacity>

          {(!full.loaded || full.buffering) && (
            <View style={styles.center} pointerEvents="none">
              <ActivityIndicator color={ACCENT} size="large" />
            </View>
          )}
          {full.loaded && !full.playing && !full.buffering && (
            <View style={[styles.center, styles.dim]} pointerEvents="none">
              <View style={styles.playCircle}>
                <Ionicons name="play" size={34} color="#000000" />
              </View>
            </View>
          )}

          {/* Küçült */}
          <TouchableOpacity
            onPress={close}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={[styles.closeBtn, { top: insets.top + 12 }]}
            accessibilityLabel="Küçült"
          >
            <Ionicons name="contract" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={[styles.fullBar, { bottom: insets.bottom + 18 }]} pointerEvents="none">
            <View style={styles.bar}>
              <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.time}>
              {fmt(position)} / {fmt(duration)}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  frame: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#2C3030',
  },
  center: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  dim: { backgroundColor: 'rgba(0,0,0,0.35)' },
  playCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
  },
  hint: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginTop: 12 },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 10 },
  bar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#2C3030', overflow: 'hidden' },
  barFill: { height: 4, backgroundColor: ACCENT },
  time: { color: '#8A8F8F', fontSize: 12, fontVariant: ['tabular-nums'] },
  fullRoot: { flex: 1, backgroundColor: '#000000' },
  closeBtn: {
    position: 'absolute',
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(28,31,31,0.85)',
    borderWidth: 1,
    borderColor: '#2C3030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullBar: {
    position: 'absolute',
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
