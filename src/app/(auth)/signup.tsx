import SocialButton from "@/components/SocialButton";
import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleSignUp = () => {
    // Show verification modal
    setShowVerification(true);
  };

  const handleVerificationComplete = () => {
    setShowVerification(false);
    router.push("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="px-6"
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mb-6 mt-4"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text className="text-2xl color-text-primary">{"<"}</Text>
        </TouchableOpacity>

        {/* Heading */}
        <Text className="text-4xl font-bold color-text-primary mb-2">
          Create your account
        </Text>

        {/* Subheading */}
        <Text className="text-lg color-text-secondary mb-8">
          Start your language journey today ✨
        </Text>

        {/* Mascot Image */}
        <View className="items-center mb-10 -mx-6 px-6">
          <Image
            source={images.mascotAuth}
            style={{ width: 180, height: 140 }}
            resizeMode="contain"
          />
        </View>

        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-sm color-text-secondary font-semibold mb-2">
            Email
          </Text>
          <TextInput
            placeholder="alex@gmail.com"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            className="border border-border rounded-2xl px-4 py-3 color-text-primary"
          />
        </View>

        {/* Password Input */}
        <View className="mb-8">
          <Text className="text-sm color-text-secondary font-semibold mb-2">
            Password
          </Text>
          <View className="relative">
            <TextInput
              placeholder="Password"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
              className="border border-border rounded-2xl px-4 py-3 color-text-primary pr-12"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text className="text-lg color-text-secondary">
                {showPassword ? "👁" : "👁‍🗨"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-lingua-purple rounded-full py-4 mb-6"
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-semibold text-center">
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-border" />
          <Text className="color-text-secondary text-sm mx-3">
            or continue with
          </Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        {/* Social Auth Button */}
        <View className="mb-8">
          <SocialButton provider="google" />
        </View>

        {/* Sign In Link */}
        <View className="flex-row justify-center items-center gap-2 pb-6">
          <Text className="color-text-secondary text-base">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
            <Text className="color-lingua-purple font-semibold text-base">
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <VerificationModal
        visible={showVerification}
        onComplete={handleVerificationComplete}
        email={email}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 12,
  },
});
