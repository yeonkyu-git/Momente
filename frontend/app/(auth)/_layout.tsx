import { Stack } from 'expo-router';

const AuthLayout = () => (
  <Stack
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#FFFFFF' },
    }}
  />
);

export default AuthLayout;
