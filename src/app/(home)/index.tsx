import { images } from "@/constants/images";
import { LANGUAGES } from "@/data/languages";
import { getClerkErrorMessage } from "@/lib/clerk";
import { useLanguageStore } from "@/store/languageStore";
import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { selectedLanguage, clearSelectedLanguage } = useLanguageStore();

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/onboarding" />;

  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const currentLanguage = LANGUAGES.find((l) => l.code === selectedLanguage);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setSignOutError("");
    try {
      await signOut();
      router.replace("/onboarding");
    } catch (error) {
      setSignOutError(getClerkErrorMessage(error, "Could not sign out."));
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleClearPersistence = () => {
    clearSelectedLanguage();
    // The redirect will be handled by the layout when state changes
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-between px-6 py-10">
        {/* Brand + User */}
        <View className="items-center gap-3">
          <Image
            source={images.mascotLogo}
            className="h-16 w-16"
            resizeMode="contain"
          />
          <Text className="font-poppins-bold text-[32px] text-lingua-purple">
            Lingua
          </Text>
          <Text className="font-poppins text-[14px] text-text-secondary">
            {email}
          </Text>

          {currentLanguage ? (
            <View className="flex-row items-center gap-2 mt-4 px-4 py-2 bg-surface rounded-full">
              <Image
                source={{ uri: currentLanguage.flag }}
                className="h-6 w-6 rounded-full border border-gray-200"
              />
              <Text className="font-poppins-medium text-[15px] text-text-primary">
                Learning {currentLanguage.name}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => router.push("/language-selection")}
              className="mt-4 flex-row items-center gap-2 px-4 py-2 bg-surface rounded-full"
            >
              <Text className="font-poppins-medium text-[14px] text-lingua-purple">
                Choose Language
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => router.push("/language-selection")}
            className="mt-2"
          >
            <Text className="font-poppins text-[13px] text-lingua-purple underline">
              Change Language
            </Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View className="w-full gap-4">
          <TouchableOpacity
            onPress={handleClearPersistence}
            className="w-full items-center justify-center py-3 border border-gray-200 rounded-[18px]"
          >
            <Text className="font-poppins-medium text-[15px] text-text-secondary">
              Clear Persistence (Test)
            </Text>
          </TouchableOpacity>

          {/* Sign Out */}
          <View className="w-full gap-2">
            {signOutError ? (
              <Text className="text-center font-poppins text-[13px] text-error">
                {signOutError}
              </Text>
            ) : null}

            <TouchableOpacity
              activeOpacity={0.85}
              className={`h-15 w-full items-center justify-center rounded-[18px] border-b-[3px] border-lingua-deep-purple bg-lingua-purple ${
                isSigningOut ? "opacity-60" : ""
              }`}
              disabled={isSigningOut}
              onPress={handleSignOut}
            >
              <Text className="font-poppins-semibold text-[17px] text-white">
                {isSigningOut ? "Signing out..." : "Sign out"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
