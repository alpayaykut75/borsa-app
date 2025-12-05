// --- src/screens/AIScreen.tsx ---
import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
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
    text: "Merhaba Ortak! Finansal karmaşayı çözmeye hazırım. Sorunu sor, kodu birlikte çözelim.", // Moono'nun samimi tonu
};

export default function AIScreen() {
  // Başlangıç mesajını ekliyoruz
  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      const errorMessage: Message = { id: Date.now() + 2, text: "Bağlantı kodlarında hata var, tekrar dene.", sender: 'moono' };
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
        <ScrollView contentContainerStyle={styles.messageList}>
          {/* Mesajları normal sırada render et */}
          {messages.map(renderMessage)}
        </ScrollView>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Moono'ya bir soru sor..."
            placeholderTextColor="#666"
            editable={!isLoading}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            style={[styles.sendButton, { opacity: isLoading || !input.trim() ? 0.5 : 1 }]}
            onPress={handleSendMessage}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color={DEEP_SPACE_BLACK} size="small" />
            ) : (
              <Text style={styles.sendButtonText}>KOD ÇÖZ</Text>
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
    backgroundColor: NEON_CYAN + '20', // Neon Cyan'ın %20 şeffaflığı (Fütüristik görünüm)
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
  sendButton: {
    backgroundColor: NEON_CYAN,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: DEEP_SPACE_BLACK, // Neon Cyan üzerinde siyah yazı
    fontWeight: 'bold',
  },
});

