import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STRINGS } from '@/constants/strings';

const HomeScreen = () => (
  <SafeAreaView className="flex-1 bg-white">
    <View className="flex-1 items-center justify-center px-6">
      <View className="h-16 w-16 rounded-full bg-primary mb-6" />
      <Text className="text-2xl font-bold text-primary-dark mb-2">
        {STRINGS.appName}
      </Text>
      <Text className="text-base text-neutral-600 text-center">
        {STRINGS.bootstrapTagline}
      </Text>
    </View>
  </SafeAreaView>
);

export default HomeScreen;
