import { useLayoutEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Completion'>;

const palette = {
  background: '#000000',
  accent: '#00C4CC',
  text: '#FFFFFF',
  muted: '#A3A3A3',
};

export default function CompletionScreen({ route, navigation }: Props) {
  const { unitId, unitTitle } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleContinue = () => {
    // Navigate to Main tab, then to HomeStack's UnitDetail
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate('Main', {
        screen: 'HomeStack',
        params: {
          screen: 'UnitDetail',
          params: {
            unitId: unitId,
            unitTitle: unitTitle,
          },
        },
      });
    } else {
      // Fallback: navigate to Main tab
      navigation.navigate('Main');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="rocket" size={120} color={palette.accent} />
          </View>
          
          <Text style={styles.title}>Görev Tamamlandı! 🚀</Text>
          
          <Text style={styles.subtitle}>
            Harika gidiyorsun. Bir sonraki adımın kilidi açıldı.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: palette.text,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: palette.muted,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: palette.accent,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: palette.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

