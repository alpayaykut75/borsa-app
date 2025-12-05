// --- src/utils/MoonoFormatter.tsx ---
import React from 'react';
import { Text } from 'react-native';

// MARKADAN GELEN DEĞERLER (Brand Code)
const NEON_CYAN = '#00C4CC'; 
const HARD_CONSTRAINT_MESSAGE =
  "Unutmayın, ben bir yapay zeka asistanıyım. Yatırım tavsiyesi verme yetkim ve bilgim yoktur. Kararlarınızı daima kendi analizlerinize göre vermelisiniz.";

/**
 * Moono'dan gelen metni analiz eder ve kısıtlama cümlesini Neon Cyan ile vurgular.
 * Bu, React Native Text component'leri dizisi döndürür.
 * @param text Moono'dan gelen yanıt metni
 * @returns React Native Text component'leri dizisi
 */
export const formatMoonoResponse = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  const constraintIndex = text.indexOf(HARD_CONSTRAINT_MESSAGE);

  // Kısıtlama Cümlesi yanıtta varsa
  if (constraintIndex !== -1) {
    
    // 1. Kısıtlama öncesi normal metin
    if (constraintIndex > 0) {
      parts.push(
        <Text key="normal-pre" style={{ color: 'white', fontSize: 16 }}>
          {text.substring(0, constraintIndex)}
        </Text>
      );
    }
    
    // 2. Kısıtlama Cümlesi (Vurgulanmış kısım)
    parts.push(
      <Text key="constraint" style={{ color: NEON_CYAN, fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>
        {HARD_CONSTRAINT_MESSAGE}
      </Text>
    );

    // 3. Kısıtlama sonrası kalan metin
    const postConstraintText = text.substring(constraintIndex + HARD_CONSTRAINT_MESSAGE.length);
    if (postConstraintText.length > 0) {
      parts.push(
        <Text key="normal-post" style={{ color: 'white', fontSize: 16 }}>
          {postConstraintText}
        </Text>
      );
    }

  } else {
    // Kısıtlama Cümlesi yoksa, metni normal döndür
    parts.push(
      <Text key="full-normal" style={{ color: 'white', fontSize: 16 }}>
        {text}
      </Text>
    );
  }

  return parts;
};

