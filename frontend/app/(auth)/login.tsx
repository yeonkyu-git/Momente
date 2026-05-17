import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { STRINGS } from '@/constants/strings';
import { supabase } from '@/lib/supabase';
import { loginWithKakao } from '@/lib/kakao';
import { useAuthStore } from '@/stores/auth.store';

const LoginScreen = () => {
  const router = useRouter();
  const status = useAuthStore((s) => s.status);
  const setStatus = useAuthStore((s) => s.setStatus);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKakaoLogin = async () => {
    try {
      setErrorMessage(null);
      setStatus('loading');
      const { idToken } = await loginWithKakao();
      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'kakao',
        token: idToken,
      });
      if (error) throw error;
      // onAuthStateChange 리스너가 후처리
    } catch (err) {
      setStatus('unauthenticated');
      const message = err instanceof Error ? err.message : String(err);
      if (message.toLowerCase().includes('cancel') || message.toLowerCase().includes('user_cancelled')) {
        return; // 사용자 취소, Alert 표시 안 함
      }
      setErrorMessage(STRINGS.login.errorGeneric);
    }
  };

  const handleInviteLink = () => {
    try {
      router.push('/(auth)/couple-match');
    } catch {
      // 라우트 없을 때 에러는 무시
    }
  };

  const isLoading = status === 'loading';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        {/* Heart Icon */}
        <View className="h-16 w-16 rounded-full bg-primary items-center justify-center mb-6">
          <Text className="text-4xl text-white">❤︎</Text>
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-primary-dark mb-2 text-center">
          {STRINGS.login.title}
        </Text>

        {/* Subtitle */}
        <Text className="text-base text-neutral-500 text-center mb-8">
          {STRINGS.login.subtitle}
        </Text>

        {/* Error Message */}
        {errorMessage && (
          <Text className="text-sm text-red-500 mb-6 text-center">
            {errorMessage}
          </Text>
        )}

        {/* Spacing */}
        <View className="flex-1" />

        {/* Buttons Container */}
        <View className="w-full gap-4">
          {/* Kakao Login Button */}
          <Pressable
            className={`h-14 rounded-2xl items-center justify-center px-6 flex-row ${
              isLoading ? 'bg-primary opacity-70' : 'bg-primary'
            }`}
            onPress={handleKakaoLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text className="text-white font-semibold text-base">
                {STRINGS.login.kakaoButton}
              </Text>
            )}
          </Pressable>

          {/* Invite Code Link */}
          <Pressable onPress={handleInviteLink}>
            <Text className="text-neutral-500 text-center text-sm">
              {STRINGS.login.inviteLink}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
