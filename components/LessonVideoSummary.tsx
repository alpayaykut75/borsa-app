import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

const ACCENT = '#00C4CC';

type Props = {
  uri: string;
  /** İlk kez oynatılınca çağrılır (ses adımındaki "dinledi mi" kontrolü için). */
  onStarted?: () => void;
};

/**
 * Ders sonu animasyonlu özet videosu (dikey 9:16).
 * Ses adımının metadata'sında `video_url` varsa ses oynatıcısının yerine gösterilir.
 */
export default function LessonVideoSummary({ uri, onStarted }: Props) {
  const videoRef = useRef<Video>(null);
  const startedRef = useRef(false);
  const [status, setStatus] = useState<{
    loaded: boolean;
    playing: boolean;
    buffering: boolean;
    position: number;
    duration: number;
    finished: boolean;
  }>({ loaded: false, playing: false, buffering: false, position: 0, duration: 0, finished: false });

  const { width: ww, height: wh } = Dimensions.get('window');
  const height = Math.min(wh * 0.6, ((ww - 40) * 16) / 9);
  const width = (height * 9) / 16;

  // Adımdan çıkınca (bileşen kaldırılınca) videoyu durdur.
  useEffect(() => {
    const ref = videoRef.current;
    return () => {
      ref?.pauseAsync().catch(() => {});
    };
  }, []);

  const onStatus = (s: AVPlaybackStatus) => {
    if (!s.isLoaded) return;
    if (s.isPlaying && !startedRef.current) {
      startedRef.current = true;
      onStarted?.();
    }
    setStatus((prev) => ({
      loaded: true,
      playing: s.isPlaying,
      buffering: s.isBuffering && !s.isPlaying,
      position: s.positionMillis || 0,
      duration: s.durationMillis || 0,
      finished: s.didJustFinish ? true : prev.finished && !s.isPlaying,
    }));
  };

  const toggle = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (status.playing) {
        await v.pauseAsync();
      } else if (status.finished) {
        await v.replayAsync();
        setStatus((p) => ({ ...p, finished: false }));
      } else {
        await v.playAsync();
      }
    } catch {
      // yok say
    }
  };

  const progress = status.duration > 0 ? status.position / status.duration : 0;
  const fmt = (ms: number) => {
    const t = Math.floor(ms / 1000);
    return `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.wrap}>
      <TouchableOpacity activeOpacity={1} onPress={toggle} style={[styles.frame, { width, height }]}>
        <Video
          ref={videoRef}
          source={{ uri }}
          style={StyleSheet.absoluteFill}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
          progressUpdateIntervalMillis={250}
          onPlaybackStatusUpdate={onStatus}
        />
        {(!status.loaded || status.buffering) && (
          <View style={styles.center} pointerEvents="none">
            <ActivityIndicator color={ACCENT} />
          </View>
        )}
        {status.loaded && !status.playing && !status.buffering && (
          <View style={[styles.center, styles.dim]} pointerEvents="none">
            <View style={styles.playCircle}>
              <Ionicons name={status.finished ? 'refresh' : 'play'} size={34} color="#000000" />
            </View>
            {status.position === 0 && !status.finished && <Text style={styles.hint}>Özeti izle</Text>}
          </View>
        )}
      </TouchableOpacity>

      <View style={[styles.progressRow, { width }]}>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.time}>
          {fmt(status.position)} / {fmt(status.duration)}
        </Text>
      </View>
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
});
