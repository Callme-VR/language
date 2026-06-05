import { images } from "@/constants/images";
import { useAuth } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;
  if (isSignedIn) return <Redirect href="/(home)" />;

  const handleGetStarted = () => {
    router.push("/(auth)/signup");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6"
      >
        {/* Header with Logo and App Name */}
        <View className="items-center pt-6">
          <View className="flex-row items-center gap-2 mb-12">
            <Image
              source={images.mascotLogo}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold color-text-primary">
              Langtranslator
            </Text>
          </View>

          {/* Main Heading */}
          <Text className="text-4xl font-bold text-center mb-4 color-text-primary">
            Your Real <Text className="text-lingua-purple">Time</Text> Language{" "}
            <Text className="text-lingua-purple">Translator</Text>
          </Text>

          {/* Subheading */}
          <Text className="text-base text-center color-text-secondary leading-6">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Mascot with Speech Bubbles */}
        <View className="items-center my-8">
          {/* Speech Bubbles */}
          <View className="flex-row gap-3 mb-6 justify-between w-full">
            <View className="bg-blue-100 rounded-2xl px-4 py-2 max-w-24">
              <Text className="text-lg font-semibold color-text-primary">
                Hello!
              </Text>
            </View>
            <View />
            <View className="bg-blue-100 rounded-2xl px-4 py-2 max-w-24">
              <Text className="text-lg font-semibold color-lingua-purple">
                ¡Hola!
              </Text>
            </View>
          </View>

          {/* Mascot Image */}
          <Image
            source={images.mascotWelcome}
            style={{
              width: 280,
              height: 280,
              marginBottom: 16,
            }}
            resizeMode="contain"
          />

          {/* Speech Bubble Below */}
          <View className="bg-red-50 rounded-2xl px-4 py-2 max-w-32">
            <Text className="text-lg font-semibold color-red-600">你好!</Text>
          </View>
        </View>

        {/* Get Started Button */}
        <View className="pb-8">
          <TouchableOpacity
            onPress={handleGetStarted}
            className="bg-lingua-purple rounded-full py-4 px-6 flex-row items-center justify-center"
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-semibold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
