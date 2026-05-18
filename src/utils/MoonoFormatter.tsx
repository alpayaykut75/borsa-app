// --- src/utils/MoonoFormatter.tsx ---
import React from 'react';
import { Text } from 'react-native';

// MARKADAN GELEN DEĞERLER (Brand Code)
const NEON_CYAN = '#00C4CC';
/** Moono sohbet balonları — AIScreen ile aynı */
const CHAT_FONT_SIZE = 17;
const CHAT_LINE_HEIGHT = 26;

const HARD_CONSTRAINT_MESSAGE =
  'Unutma Ortak: Ben bir eğitim asistanıyım; yatırım tavsiyesi veremem. Son kararını kendi araştırmana göre vermelisin.';

/** Eski cache / yanıtlar için */
const LEGACY_CONSTRAINT_MESSAGE =
  'Unutmayın, ben bir yapay zeka asistanıyım. Yatırım tavsiyesi verme yetkim ve bilgim yoktur. Kararlarınızı daima kendi analizlerinize göre vermelisiniz.';

/**
 * Moono'dan gelen metni analiz eder ve kısıtlama cümlesini Neon Cyan ile vurgular.
 * Bu, React Native Text component'leri dizisi döndürür.
 * @param text Moono'dan gelen yanıt metni
 * @returns React Native Text component'leri dizisi
 */
export const formatMoonoResponse = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let constraintIndex = text.indexOf(HARD_CONSTRAINT_MESSAGE);
  let constraintMessage = HARD_CONSTRAINT_MESSAGE;
  if (constraintIndex === -1) {
    constraintIndex = text.indexOf(LEGACY_CONSTRAINT_MESSAGE);
    if (constraintIndex !== -1) constraintMessage = LEGACY_CONSTRAINT_MESSAGE;
  }

  // Kısıtlama Cümlesi yanıtta varsa
  if (constraintIndex !== -1) {
    
    // 1. Kısıtlama öncesi normal metin
    if (constraintIndex > 0) {
      parts.push(
        <Text key="normal-pre" style={{ color: 'white', fontSize: CHAT_FONT_SIZE, lineHeight: CHAT_LINE_HEIGHT }}>
          {text.substring(0, constraintIndex)}
        </Text>
      );
    }
    
    // 2. Kısıtlama Cümlesi (Vurgulanmış kısım)
    parts.push(
      <Text key="constraint" style={{ color: NEON_CYAN, fontWeight: 'bold', fontSize: CHAT_FONT_SIZE, lineHeight: CHAT_LINE_HEIGHT, marginTop: 8 }}>
        {constraintMessage}
      </Text>
    );

    // 3. Kısıtlama sonrası kalan metin
    const postConstraintText = text.substring(constraintIndex + constraintMessage.length);
    if (postConstraintText.length > 0) {
      parts.push(
        <Text key="normal-post" style={{ color: 'white', fontSize: CHAT_FONT_SIZE, lineHeight: CHAT_LINE_HEIGHT }}>
          {postConstraintText}
        </Text>
      );
    }

  } else {
    // Kısıtlama Cümlesi yoksa, metni normal döndür
    parts.push(
      <Text key="full-normal" style={{ color: 'white', fontSize: CHAT_FONT_SIZE, lineHeight: CHAT_LINE_HEIGHT }}>
        {text}
      </Text>
    );
  }

  return parts;
};

