import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClerk } from "@clerk/expo";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/onboarding");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-poppins-bold text-2xl text-lingua-purple mb-8">Profile</Text>
        
        <TouchableOpacity
          onPress={handleSignOut}
          className="w-full bg-surface py-4 rounded-2xl items-center border border-gray-100"
        >
          <Text className="font-poppins-semibold text-text-primary">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
