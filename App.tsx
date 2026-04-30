import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

import { supabase } from './lib/supabase';
import AnimatedSplash from './components/AnimatedSplash';
import HomeScreen from './screens/HomeScreen';
import LessonScreen from './screens/LessonScreen';
import UnitDetailScreen from './screens/UnitDetailScreen';
import AIScreen from './src/screens/AIScreen';
import ProfileScreen from './screens/ProfileScreen';
import CompletionScreen from './screens/CompletionScreen';
import LevelExamScreen from './screens/LevelExamScreen';

export type RootStackParamList = {
  Main: undefined;
  Lesson: {
    lessonId: number;
    lessonTitle?: string;
    unitId?: number;
    unitTitle?: string;
    entryStatus?: 'LOCKED' | 'ACTIVE' | 'COMPLETED';
  };
  Completion: {
    unitId: number;
    unitTitle: string;
    isUnitCompleted?: boolean;
    forceReturnToUnitDetail?: boolean;
    levelExamPassed?: boolean;
  };
  LevelExam: {
    unitId: number;
    unitTitle: string;
  };
};

export type HomeStackParamList = {
  Home: undefined;
  UnitDetail: { unitId: number; unitTitle: string; levelExamPassed?: boolean };
};

export type MainTabParamList = {
  HomeStack: undefined;
  Assistant: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeStackNavigator = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function HomeStack() {
  return (
    <HomeStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStackNavigator.Screen
        name="Home"
        component={HomeScreen}
      />
      <HomeStackNavigator.Screen
        name="UnitDetail"
        component={UnitDetailScreen}
      />
    </HomeStackNavigator.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#00C4CC',
        tabBarInactiveTintColor: '#888888',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Assistant"
        component={AIScreen}
        options={{
          tabBarLabel: 'Moono',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const appFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const initializeAuth = async () => {
      // Oturum kontrolü yap
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.warn('Oturum kontrolü hatası:', sessionError.message);
      }

      // Eğer aktif bir oturum yoksa, anonim giriş yap
      if (!session) {
        const { data, error: signInError } = await supabase.auth.signInAnonymously();
        
        if (signInError) {
          console.error('Anonim giriş hatası:', signInError.message);
        } else {
          console.log('Anonim giriş yapıldı');
        }
      }
    };

    initializeAuth();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    if (!showSplash) {
      appFadeAnim.setValue(0);
      Animated.timing(appFadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [showSplash, appFadeAnim]);

  if (showSplash) {
    return (
      <>
        <StatusBar style="light" />
        <AnimatedSplash onFinish={handleSplashFinish} />
      </>
    );
  }

  return (
    <Animated.View style={{ flex: 1, opacity: appFadeAnim }}>
      <NavigationContainer
        theme={{
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: '#000000',
            card: '#1A1A1A',
            border: '#333333',
            text: '#ffffff',
            primary: '#00C4CC',
          },
        }}
      >
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1A1A1A',
            },
            headerTitleStyle: {
              fontWeight: '700',
              color: '#00C4CC',
            },
            headerTintColor: '#00C4CC',
            headerShadowVisible: false,
            headerBackTitle: '',
          }}
        >
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Lesson"
            component={LessonScreen}
            options={({ route }) => ({
              title: route.params.lessonTitle || 'Ders',
              headerBackTitle: '',
              headerTitleStyle: {
                fontSize: 28,
                fontWeight: '800',
                color: '#00C4CC',
              },
            })}
          />
          <Stack.Screen
            name="Completion"
            component={CompletionScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LevelExam"
            component={LevelExamScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Animated.View>
  );
}