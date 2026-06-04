import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="h1 mt-80 text-center color-lingua-purple mb-8">
        Langtrans
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/onboarding")}
        className="bg-lingua-purple rounded-full py-3 px-8"
      >
        <Text className="text-white font-semibold text-base">
          View Onboarding
        </Text>
      </TouchableOpacity>
    </View>
  );
}
