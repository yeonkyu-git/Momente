import type { ExpoConfig } from 'expo/config';

const KAKAO_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_APP_KEY;

if (!KAKAO_APP_KEY) {
  throw new Error(
    'EXPO_PUBLIC_KAKAO_APP_KEY 환경변수가 필요합니다. frontend/.env 를 확인하세요.',
  );
}

const config: ExpoConfig = {
  name: 'Momente',
  slug: 'momente',
  version: '0.1.0',
  orientation: 'portrait',
  scheme: 'momente',
  userInterfaceStyle: 'light',
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#FBEAF0',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.momente.app',
    infoPlist: {
      NSPhotoLibraryUsageDescription:
        '사진을 게시글에 첨부하기 위해 갤러리 접근 권한이 필요합니다.',
      NSCameraUsageDescription:
        '프로필 사진과 게시글 사진을 찍기 위해 카메라 접근 권한이 필요합니다.',
      LSApplicationQueriesSchemes: ['kakaokompassauth', 'kakaolink', 'kakaotalk'],
      CFBundleURLTypes: [
        {
          CFBundleTypeRole: 'Editor',
          CFBundleURLSchemes: [`kakao${KAKAO_APP_KEY}`],
        },
      ],
    },
  },
  android: {
    package: 'com.momente.app',
    adaptiveIcon: {
      backgroundColor: '#FBEAF0',
    },
    permissions: ['READ_MEDIA_IMAGES'],
  },
  web: {
    bundler: 'metro',
  },
  plugins: [
    'expo-router',
    'expo-image-picker',
    'expo-media-library',
    'expo-notifications',
    [
      '@react-native-kakao/core',
      {
        nativeAppKey: KAKAO_APP_KEY,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
