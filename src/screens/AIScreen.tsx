// --- src/screens/AIScreen.tsx ---
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import { getMoonoResponse } from '../services/MoonoAIService'; // Adım 1'de oluşturulan servis
import { formatMoonoResponse } from '../utils/MoonoFormatter'; // Formatlama utilitesi
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

// MARKADAN GELEN DEĞERLER (Brand Code)
const DEEP_SPACE_BLACK = '#000000'; // Ana arka plan
const DARK_MATTER_GREY = '#1A1A1A'; // Kartlar/Giriş alanı
const NEON_CYAN = '#00C4CC'; // Ana aksiyon rengi

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

  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME_MESSAGE]);
  const [chatHydrated, setChatHydrated] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setChatHydrated(false);
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setInput('');

    (async () => {
      try {
        await removeLegacySharedMoonoChat();
        const stored = await loadMoonoChatMessages(storageKey);
        if (cancelled) return;
        setMessages(stored ?? [INITIAL_WELCOME_MESSAGE]);
      } catch {
        if (!cancelled) setMessages([INITIAL_WELCOME_MESSAGE]);
      } finally {
        if (!cancelled) setChatHydrated(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  useEffect(() => {
    if (!chatHydrated) return;
    saveMoonoChatMessages(storageKey, messages).catch(() => {});
  }, [messages, chatHydrated, storageKey]);

  // Gönder butonu tıklandığında çalışır
  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    
    // 1. Kullanıcı mesajını ekle
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Moono servisini çağır
      const history = messages
        .filter((m) => m.id !== userMessage.id)
        .slice(-10)
        .map((m) => ({
          role: m.sender,
          text: m.text,
        })) as { role: 'user' | 'moono'; text: string }[];

      const userTurnIndex = history.filter((m) => m.role === 'user').length;
      const moonoText = await getMoonoResponse(userMessage.text, history, userTurnIndex);

      // 3. Moono cevabını ekle
      const moonoResponse: Message = { id: Date.now() + 1, text: moonoText, sender: 'moono' };
      setMessages(prev => [...prev, moonoResponse]);

    } catch (error) {
      console.error("API Call Error:", error);
      const errorMessage: Message = { id: Date.now() + 2, text: "Bağlantıda bir sorun oluştu Ortak. Kısa süre sonra tekrar deneyelim.", sender: 'moono' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  // Sohbet balonunu render eder
  const renderMessage = ({ id, text, sender }: Message) => (
    <View key={String(id)} style={[
      styles.messageBubble,
      sender === 'user' ? styles.userBubble : styles.moonoBubble
    ]}>
      {sender === 'moono' ? (
        // Moono'nun yanıtlarını formatlamak için utilite kullanılır (Vurgu için)
        <Text style={styles.moonoText}>
          {formatMoonoResponse(text)}
        </Text>
      ) : (
        // Kullanıcı metni
        <Text style={styles.userText}>{text}</Text>
      )}
    </View>
  );

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
        <ScrollView contentContainerStyle={styles.messageList}>
          {/* Mesajları normal sırada render et */}
          {messages.map(renderMessage)}
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
  messageList: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexGrow: 1,
    justifyContent: 'flex-end', // İçeriği altta tutar
  },
  messageBubble: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: '85%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: DARK_MATTER_GREY, // Gri kart rengi
    borderBottomRightRadius: 5,
  },
  moonoBubble: {
    alignSelf: 'flex-start',
    backgroundColor: DARK_MATTER_GREY,
    borderWidth: 1,
    borderColor: NEON_CYAN + '55',
    borderBottomLeftRadius: 5,
  },
  userText: {
    color: 'white',
    fontSize: 17,
    lineHeight: 26,
  },
  moonoText: {
    color: 'white',
    fontSize: 17,
    lineHeight: 26,
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
    fontSize: 17,
    lineHeight: 22,
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

