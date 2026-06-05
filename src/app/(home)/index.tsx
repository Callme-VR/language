import { images } from "@/constants/images";
import { getClerkErrorMessage } from "@/lib/clerk";
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

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/onboarding" />;

  const email = user?.primaryEmailAddress?.emailAddress ?? "";

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
          
          <TouchableOpacity 
            onPress={() => router.push("/language-selection")}
            className="mt-4 flex-row items-center gap-2 px-4 py-2 bg-surface rounded-full"
          >
            <Text className="font-poppins-medium text-[14px] text-lingua-purple">
              Choose Language
            </Text>
          </TouchableOpacity>
        </View>

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
    </SafeAreaView>
  );
}
