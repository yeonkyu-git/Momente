import '../global.css';
import { Stack, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { supabase } from '@/lib/supabase';
import { initKakao } from '@/lib/kakao';
import { useAuthStore } from '@/stores/auth.store';

const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const status = useAuthStore((s) => s.status);
  const setStatus = useAuthStore((s) => s.setStatus);
  const setSession = useAuthStore((s) => s.setSession);

  // 1회 부트스트랩
  useEffect(() => {
    initKakao();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setStatus(session ? 'authenticated' : 'unauthenticated');
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setStatus(session ? 'authenticated' : 'unauthenticated');
    });
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  // 인증 게이트
  useEffect(() => {
    if (status === 'idle' || status === 'loading') return;
    const inAuthGroup = segments[0] === '(auth)';
    if (status === 'unauthenticated' && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (status === 'authenticated' && inAuthGroup) {
      router.replace('/');
    }
  }, [status, segments]);

  if (status === 'idle') {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </SafeAreaProvider>
  );
};

export default RootLayout;
