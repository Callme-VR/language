import { useLanguageStore } from "@/store/languageStore";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { selectedLanguage } = useLanguageStore();

  if (!isLoaded) return null;

  if (isSignedIn) {
    if (!selectedLanguage) {
      return <Redirect href="/language-selection" />;
    }
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/onboarding" />;
}
