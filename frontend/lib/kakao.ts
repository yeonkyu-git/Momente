import { initializeKakaoSDK } from '@react-native-kakao/core';
import { login, logout } from '@react-native-kakao/user';

const KAKAO_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_APP_KEY;

let initialized = false;

export const initKakao = (): void => {
  if (initialized) return;
  if (!KAKAO_APP_KEY) {
    throw new Error('EXPO_PUBLIC_KAKAO_APP_KEY 환경변수가 필요합니다');
  }
  initializeKakaoSDK(KAKAO_APP_KEY);
  initialized = true;
};

export const loginWithKakao = async (): Promise<{ idToken: string }> => {
  const result = await login();
  if (!result.idToken) {
    throw new Error('카카오 ID 토큰을 받지 못했습니다');
  }
  return { idToken: result.idToken };
};

export const logoutKakao = async (): Promise<void> => {
  try {
    await logout();
  } catch {
    // SDK 측 로그아웃은 best-effort
  }
};
