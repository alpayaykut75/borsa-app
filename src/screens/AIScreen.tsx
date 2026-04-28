// --- src/screens/AIScreen.tsx ---
import React, { useState, useCallback, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from 'react-native';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import { getMoonoResponse } from '../services/MoonoAIService'; // Adım 1'de oluşturulan servis
import { formatMoonoResponse } from '../utils/MoonoFormatter'; // Formatlama utilitesi
import { SafeAreaView } from 'react-native-safe-area-context';

// MARKADAN GELEN DEĞERLER (Brand Code)
const DEEP_SPACE_BLACK = '#000000'; // Ana arka plan
const DARK_MATTER_GREY = '#1A1A1A'; // Kartlar/Giriş alanı
const NEON_CYAN = '#00C4CC'; // Ana aksiyon rengi

// Mesaj tipleri
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'moono';
};

const INITIAL_WELCOME_MESSAGE: Message = {
  id: 1,
  sender: 'moono',
  text: 'Merhaba Ortak! Konulari birlikte sadeleştirelim. Sorunu yaz, adim adim ilerleyelim.',
};

export default function AIScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([INITIAL_WELCOME_MESSAGE]);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
      const moonoText = await getMoonoResponse(userMessage.text);

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
  }, [input, isLoading]);

  // Sohbet balonunu render eder
  const renderMessage = ({ text, sender }: Message) => (
    <View key={text + sender + Math.random()} style={[
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/moono-profile.png')}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={styles.headerTitle}>Moono</Text>
            <Text style={styles.headerSubtitle}>Ortak, yanındayım</Text>
          </View>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingVertical: 24,
    paddingBottom: 32,
  },
  avatarContainer: {
    marginRight: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: NEON_CYAN,
  },
  avatar: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.28 }, { translateY: 3 }],
  },
  headerTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#888888',
    fontSize: 16,
    fontWeight: '500',
  },
  messageList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexGrow: 1,
    justifyContent: 'flex-end', // İçeriği altta tutar
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 4,
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
    fontSize: 16,
  },
  moonoText: {
    color: 'white', // Metin formatlama utilitesi (Formatter) içinde renklenir
    fontSize: 16,
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
    fontSize: 16,
    marginRight: 10,
    height: 50,
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

