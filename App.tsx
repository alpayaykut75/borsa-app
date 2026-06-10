import { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { NavigationContainer, DarkTheme, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
// @ts-expect-error - @expo/vector-icons type declarations may be missing
import { Ionicons } from '@expo/vector-icons';

import AnimatedSplash from './components/AnimatedSplash';
import HomeScreen from './screens/HomeScreen';
import ShortsScreen from './screens/ShortsScreen';
import GrowthCenterScreen from './screens/GrowthCenterScreen';
import FlashcardLibraryScreen from './screens/FlashcardLibraryScreen';
import LessonScreen from './screens/LessonScreen';
import UnitDetailScreen from './screens/UnitDetailScreen';
import AIScreen from './src/screens/AIScreen';
import MarketNewsScreen from './screens/MarketNewsScreen';
import ProfileScreen from './screens/ProfileScreen';
import CompletionScreen from './screens/CompletionScreen';
import LevelExamScreen from './screens/LevelExamScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import AppTourOverlay, { TOUR_SEEN_KEY } from './components/AppTourOverlay';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { PremiumProvider } from './src/contexts/PremiumContext';
import { supabase } from './lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    /** Seviye 1, 5. ders bitti — ücretsiz bölüm sonu */
    showFreeTierEndPaywall?: boolean;
  };
  LevelExam: {
    unitId: number;
    unitTitle: string;
  };
};

export type HomeStackParamList = {
  Home: undefined;
  UnitDetail: { unitId: number; unitTitle: string; levelExamPassed?: boolean };
  GrowthCenter: undefined;
  FlashcardLibrary: undefined;
  MarketNews: undefined;
};

export type MainTabParamList = {
  HomeStack: undefined;
  Shorts: undefined;
  Assistant: undefined;
  Profile: undefined;
};

type AuthScreenName = 'Login' | 'SignUp' | 'ForgotPassword';

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
      <HomeStackNavigator.Screen
        name="GrowthCenter"
        component={GrowthCenterScreen}
      />
      <HomeStackNavigator.Screen
        name="FlashcardLibrary"
        component={FlashcardLibraryScreen}
      />
      <HomeStackNavigator.Screen
        name="MarketNews"
        component={MarketNewsScreen}
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
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('HomeStack', {
              screen: 'Home',
            } as never);
          },
        })}
      />
      <Tab.Screen
        name="Shorts"
        component={ShortsScreen}
        options={{
          tabBarLabel: 'Shorts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle" size={size} color={color} />
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

function AuthFlow() {
  const { signIn, signUp, resetPassword } = useAuth();
  const [screen, setScreen] = useState<AuthScreenName>('Login');

  if (screen === 'SignUp') {
    return (
      <SignupScreen
        onNavigateToLogin={() => setScreen('Login')}
        onSignUp={signUp}
      />
    );
  }

  if (screen === 'ForgotPassword') {
    return (
      <ForgotPasswordScreen
        onNavigateToLogin={() => setScreen('Login')}
        onResetPassword={resetPassword}
      />
    );
  }

  return (
    <LoginScreen
      onNavigateToSignUp={() => setScreen('SignUp')}
      onNavigateToForgotPassword={() => setScreen('ForgotPassword')}
      onSignIn={signIn}
    />
  );
}

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000000',
    card: '#1A1A1A',
    border: '#333333',
    text: '#ffffff',
    primary: '#00C4CC',
  },
};

function AppContent() {
  const { session, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState<boolean | null>(null);
  const [showTour, setShowTour] = useState(false);
  const navigationRef = createNavigationContainerRef<RootStackParamList>();
  const appFadeAnim = useRef(new Animated.Value(0)).current;

  const isAuthenticated = !!session && !session.user.is_anonymous;

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

  useEffect(() => {
    if (!isAuthenticated || !session) {
      setNeedsOnboarding(null);
      return;
    }
    const checkProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('first_name')
        .eq('id', session.user.id)
        .single();
      const profileComplete = !!data?.first_name;
      setNeedsOnboarding(!profileComplete);

      if (profileComplete) {
        const tourSeen = await AsyncStorage.getItem(TOUR_SEEN_KEY);
        if (!tourSeen) setShowTour(true);
      }
    };
    checkProfile();
  }, [isAuthenticated, session]);

  if (showSplash) {
    return (
      <>
        <StatusBar style="light" />
        <AnimatedSplash onFinish={handleSplashFinish} />
      </>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <StatusBar style="light" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <StatusBar style="light" />
        <AuthFlow />
      </>
    );
  }

  if (needsOnboarding === null) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <StatusBar style="light" />
      </View>
    );
  }

  if (needsOnboarding) {
    return (
      <>
        <StatusBar style="light" />
        <OnboardingScreen
          userId={session!.user.id}
          onComplete={() => {
            setNeedsOnboarding(false);
            setShowTour(true);
          }}
        />
      </>
    );
  }

  return (
    <Animated.View style={{ flex: 1, opacity: appFadeAnim }}>
      <NavigationContainer ref={navigationRef} theme={navTheme}>
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
      {showTour && (
        <AppTourOverlay
          navigationRef={navigationRef as React.RefObject<any>}
          onFinish={() => setShowTour(false)}
        />
      )}
    </Animated.View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PremiumProvider>
          <AppContent />
        </PremiumProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
