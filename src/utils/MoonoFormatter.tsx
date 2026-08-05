// --- src/utils/MoonoFormatter.tsx ---
import React from 'react';
import { Text } from 'react-native';

const NEON_CYAN = '#00C4CC';
const CHAT_FONT_SIZE = 17;
const CHAT_LINE_HEIGHT = 26;

const HARD_CONSTRAINT_MESSAGE =
  'Unutma Ortak: Ben bir eğitim asistanıyım; yatırım tavsiyesi veremem. Son kararını kendi araştırmana göre vermelisin.';

const LEGACY_CONSTRAINT_MESSAGE =
  'Unutmayın, ben bir yapay zeka asistanıyım. Yatırım tavsiyesi verme yetkim ve bilgim yoktur. Kararlarınızı daima kendi analizlerinize göre vermelisiniz.';

const baseStyle = {
  color: 'white' as const,
  fontSize: CHAT_FONT_SIZE,
  lineHeight: CHAT_LINE_HEIGHT,
};

/** **kalın** parçalarını React Native Text olarak ayırır */
function renderInlineMarkdown(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter((p) => p.length > 0);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <Text key={`${keyPrefix}-b-${index}`} style={[baseStyle, { fontWeight: '700' }]}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    return (
      <Text key={`${keyPrefix}-t-${index}`} style={baseStyle}>
        {part}
      </Text>
    );
  });
}

/**
 * Moono yanıtını formatlar: kısıtlama cümlesi cyan, **bold** destekli.
 */
export const formatMoonoResponse = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let constraintIndex = text.indexOf(HARD_CONSTRAINT_MESSAGE);
  let constraintMessage = HARD_CONSTRAINT_MESSAGE;
  if (constraintIndex === -1) {
    constraintIndex = text.indexOf(LEGACY_CONSTRAINT_MESSAGE);
    if (constraintIndex !== -1) constraintMessage = LEGACY_CONSTRAINT_MESSAGE;
  }

  if (constraintIndex !== -1) {
    if (constraintIndex > 0) {
      parts.push(
        <Text key="normal-pre" style={baseStyle}>
          {renderInlineMarkdown(text.substring(0, constraintIndex), 'pre')}
        </Text>,
      );
    }

    parts.push(
      <Text
        key="constraint"
        style={{
          color: NEON_CYAN,
          fontWeight: 'bold',
          fontSize: CHAT_FONT_SIZE,
          lineHeight: CHAT_LINE_HEIGHT,
          marginTop: 8,
        }}
      >
        {constraintMessage}
      </Text>,
    );

    const postConstraintText = text.substring(constraintIndex + constraintMessage.length);
    if (postConstraintText.length > 0) {
      parts.push(
        <Text key="normal-post" style={baseStyle}>
          {renderInlineMarkdown(postConstraintText, 'post')}
        </Text>,
      );
    }
  } else {
    parts.push(
      <Text key="full-normal" style={baseStyle}>
        {renderInlineMarkdown(text, 'full')}
      </Text>,
    );
  }

  return parts;
};
