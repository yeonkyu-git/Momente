import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STRINGS } from '@/constants/strings';
import { useAuthStore } from '@/stores/auth.store';

const HomeScreen = () => {
  const signOut = useAuthStore((s) => s.signOut);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <View className="h-16 w-16 rounded-full bg-primary mb-6" />
        <Text className="text-2xl font-bold text-primary-dark mb-2">
          {STRINGS.home.placeholderTitle}
        </Text>
        <Text className="text-base text-neutral-600 text-center">
          {STRINGS.home.placeholderSubtitle}
        </Text>
        <Pressable
          className="mt-10 h-12 rounded-2xl bg-primary-light px-6 items-center justify-center"
          onPress={signOut}
        >
          <Text className="text-primary font-semibold">{STRINGS.home.signOut}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
