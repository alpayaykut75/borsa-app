// --- src/screens/AIScreen.tsx ---
import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  LayoutChangeEvent,
  InteractionManager,
} from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import { getMoonoResponse } from '../services/MoonoAIService';
import { formatMoonoResponse } from '../utils/MoonoFormatter';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabScreenHeader from '../../components/TabScreenHeader';
import { useAuth } from '../contexts/AuthContext';
import {
  loadMoonoChatMessages,
  moonoChatStorageKey,
  removeLegacySharedMoonoChat,
  saveMoonoChatMessages,
  type StoredMoonoMessage,
} from '../constants/moonoChatStorage';
import { MOONO_CHARACTER_AVATAR } from '../constants/avatars';

const DEEP_SPACE_BLACK = '#000000';
const DARK_MATTER_GREY = '#1A1A1A';
const USER_BUBBLE = '#2A2A2A';
const NEON_CYAN = '#00C4CC';

type Message = StoredMoonoMessage;

const INITIAL_WELCOME_MESSAGE: Message = {
  id: 1,
  sender: 'moono',
  text: 'Merhaba Ortak! Konuları birlikte sadeleştirelim — sorunu yaz, adım adım gidelim.',
};

export default function AIScreen() {
  const { session } = useAuth();
  const storageKey = useMemo(
    () => moonoChatStorageKey(session?.user?.id),
    [session?.user?.id],
  );
  const scrollViewRef = useRef<ScrollView>(null);
  /** mesaj id → { y, height } content içinde */
  const layoutRef = useRef<Record<string, { y: number; height: number }>>({});
  const pinUserIdRef = useRef<number | null>(null);
  const thinkingHeightRef = useRef(0);
  /** Uygulama açılınca / sohbet yüklenince en alta in */
  const pendingScrollToEndRef = useRef(false);

  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME_MESSAGE]);
  const [chatHydrated, setChatHydrated] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [scrollAreaHeight, setScrollAreaHeight] = useState(0);
  const [pinUserId, setPinUserId] = useState<number | null>(null);
  const [spacerTick, setSpacerTick] = useState(0);

  const scrollToEnd = useCallback((animated = false) => {
    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollToEnd({ animated });
    });
  }, []);

  const scrollToPinnedUser = useCallback((animated = true) => {
    const id = pinUserIdRef.current;
    if (id == null) return;
    const layout = layoutRef.current[String(id)];
    if (!layout) return;
    scrollViewRef.current?.scrollTo({ y: Math.max(0, layout.y - 2), animated });
  }, []);

  const schedulePin = useCallback(
    (userId: number, animated = true) => {
      pinUserIdRef.current = userId;
      setPinUserId(userId);
      const run = () => scrollToPinnedUser(animated);
      run();
      requestAnimationFrame(run);
      setTimeout(run, 16);
      setTimeout(run, 50);
      setTimeout(run, 120);
      setTimeout(run, 280);
      InteractionManager.runAfterInteractions(run);
    },
    [scrollToPinnedUser],
  );

  /**
   * Claude mantığı: son sorunun altında, ekranı dolduracak kadar boşluk.
   * Böylece scrollTo(soru) önceki yazışmaları yukarı iter / ekrandan çıkarır.
   * Cevap uzadıkça boşluk küçülür → uzun cevapta gereksiz gap olmaz.
   */
  const turnSpacerHeight = useMemo(() => {
    void spacerTick;
    if (pinUserId == null || scrollAreaHeight <= 0) return 12;

    const userLayout = layoutRef.current[String(pinUserId)];
    const userH = userLayout?.height ?? 56;

    let afterH = 0;
    if (isLoading) {
      afterH += thinkingHeightRef.current || 48;
    }

    const pinIndex = messages.findIndex((m) => m.id === pinUserId);
    if (pinIndex >= 0) {
      for (let i = pinIndex + 1; i < messages.length; i += 1) {
        afterH += layoutRef.current[String(messages[i].id)]?.height ?? 0;
      }
    }

    // Viewport'ta sorunun altında kalan alan − altındaki içerik = spacer
    const roomBelowUser = Math.max(0, scrollAreaHeight - userH - 8);
    return Math.max(12, roomBelowUser - afterH);
  }, [pinUserId, scrollAreaHeight, messages, isLoading, spacerTick]);

  useEffect(() => {
    let cancelled = false;
    setChatHydrated(false);
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setInput('');
    pinUserIdRef.current = null;
    setPinUserId(null);
    layoutRef.current = {};
    pendingScrollToEndRef.current = false;

    (async () => {
      try {
        await removeLegacySharedMoonoChat();
        const stored = await loadMoonoChatMessages(storageKey);
        if (cancelled) return;
        setMessages(stored ?? [INITIAL_WELCOME_MESSAGE]);
      } catch {
        if (!cancelled) setMessages([INITIAL_WELCOME_MESSAGE]);
      } finally {
        if (!cancelled) {
          // Kayıtlı sohbet yüklendi → en son mesaja in (ChatGPT/Claude gibi)
          pendingScrollToEndRef.current = true;
          setChatHydrated(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  useEffect(() => {
    if (!chatHydrated || !pendingScrollToEndRef.current) return;
    const run = () => {
      if (!pendingScrollToEndRef.current || pinUserIdRef.current != null) return;
      scrollToEnd(false);
    };
    run();
    const t1 = setTimeout(run, 50);
    const t2 = setTimeout(() => {
      run();
      pendingScrollToEndRef.current = false;
    }, 300);
    InteractionManager.runAfterInteractions(run);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [chatHydrated, messages, scrollToEnd]);

  useEffect(() => {
    if (!chatHydrated) return;
    saveMoonoChatMessages(storageKey, messages).catch(() => {});
  }, [messages, chatHydrated, storageKey]);

  const handleMessageLayout = useCallback(
    (messageId: string | number, event: LayoutChangeEvent) => {
      const { y, height } = event.nativeEvent.layout;
      layoutRef.current[String(messageId)] = { y, height };
      setSpacerTick((t) => t + 1);
      if (pinUserIdRef.current != null && String(messageId) === String(pinUserIdRef.current)) {
        scrollToPinnedUser(true);
      }
    },
    [scrollToPinnedUser],
  );

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), text: input.trim(), sender: 'user' };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    // Gönderir göndermez: soru üste, önceki sohbet yukarı kaybolsun
    schedulePin(userMessage.id, true);

    try {
      const history = messages
        .filter((m) => m.id !== userMessage.id)
        .slice(-10)
        .map((m) => ({
          role: m.sender,
          text: m.text,
        })) as { role: 'user' | 'moono'; text: string }[];

      const userTurnIndex = history.filter((m) => m.role === 'user').length;
      const moonoText = await getMoonoResponse(userMessage.text, history, userTurnIndex);

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: moonoText, sender: 'moono' },
      ]);
      setIsLoading(false);
      schedulePin(userMessage.id, true);
    } catch (error) {
      console.error('API Call Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: 'Bağlantıda bir sorun oluştu Ortak. Kısa süre sonra tekrar deneyelim.',
          sender: 'moono',
        },
      ]);
      setIsLoading(false);
      schedulePin(userMessage.id, true);
    }
  }, [input, isLoading, messages, schedulePin]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TabScreenHeader
          title="Moono"
          subtitle="Ortak, yanındayım"
          avatarImage={MOONO_CHARACTER_AVATAR}
          moonoAvatarCrop
        />
        <ScrollView
          ref={scrollViewRef}
          style={styles.messageScroll}
          contentContainerStyle={styles.messageList}
          keyboardShouldPersistTaps="handled"
          onLayout={(e) => setScrollAreaHeight(e.nativeEvent.layout.height)}
          onContentSizeChange={() => {
            if (pinUserIdRef.current != null) {
              scrollToPinnedUser(false);
              return;
            }
            if (pendingScrollToEndRef.current) {
              scrollToEnd(false);
            }
          }}
        >
          {messages.map(({ id, text, sender }) =>
            sender === 'user' ? (
              <View
                key={String(id)}
                onLayout={(e) => handleMessageLayout(id, e)}
                style={styles.userRow}
              >
                <View style={styles.userBubble}>
                  <Text style={styles.userText}>{text}</Text>
                </View>
              </View>
            ) : (
              <View
                key={String(id)}
                onLayout={(e) => handleMessageLayout(id, e)}
                style={styles.moonoBlock}
              >
                <Text style={styles.moonoText}>{formatMoonoResponse(text)}</Text>
              </View>
            ),
          )}

          {isLoading && (
            <View
              style={styles.thinkingRow}
              onLayout={(e) => {
                thinkingHeightRef.current = e.nativeEvent.layout.height;
                setSpacerTick((t) => t + 1);
              }}
            >
              <ActivityIndicator color={NEON_CYAN} size="small" />
              <Text style={styles.thinkingLabel}>Düşünüyor...</Text>
            </View>
          )}

          <View style={{ height: turnSpacerHeight }} />
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, isInputFocused && styles.textInputFocused]}
            value={input}
            onChangeText={setInput}
            placeholder="Sorunu yaz..."
            placeholderTextColor="#666"
            editable={!isLoading}
            onSubmitEditing={handleSendMessage}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <TouchableOpacity
            style={[styles.sendButton, { opacity: isLoading || !input.trim() ? 0.5 : 1 }]}
            onPress={handleSendMessage}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color={DEEP_SPACE_BLACK} size="small" />
            ) : (
              <Ionicons name="send" size={18} color={DEEP_SPACE_BLACK} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DEEP_SPACE_BLACK,
  },
  keyboardView: {
    flex: 1,
  },
  messageScroll: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexGrow: 1,
  },
  userRow: {
    width: '100%',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  userBubble: {
    maxWidth: '82%',
    backgroundColor: USER_BUBBLE,
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 17,
    lineHeight: 26,
  },
  moonoBlock: {
    width: '100%',
    marginVertical: 8,
    paddingHorizontal: 2,
  },
  moonoText: {
    color: '#FFFFFF',
    fontSize: 17,
    lineHeight: 28,
  },
  thinkingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  thinkingLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: DARK_MATTER_GREY,
    alignItems: 'center',
    backgroundColor: DEEP_SPACE_BLACK,
  },
  textInput: {
    flex: 1,
    backgroundColor: DARK_MATTER_GREY,
    color: 'white',
    padding: 12,
    borderRadius: 25,
    fontSize: 18,
    lineHeight: 24,
    marginRight: 10,
    minHeight: 50,
  },
  textInputFocused: {
    borderWidth: 1,
    borderColor: NEON_CYAN,
  },
  sendButton: {
    backgroundColor: NEON_CYAN,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
