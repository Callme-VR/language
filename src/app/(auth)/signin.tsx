import AuthScreen, { type SocialProvider } from "@/components/auth-screen";
import VerificationModal from "@/components/VerificationModal";
import { getClerkErrorMessage } from "@/lib/clerk";
import { useAuth, useSignIn, useSSO } from "@clerk/expo";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const oauthStrategies = {
  google: "oauth_google",
} as const;

export default function SignInScreen() {
  const router = useRouter();
  const { isSignedIn, setActive } = useAuth();
  const { signIn, errors, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [formError, setFormError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [socialProvider, setSocialProvider] = useState<SocialProvider | null>(
    null,
  );

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(home)/index");
    }
  }, [isSignedIn, router]);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setFormError("Enter your email to continue.");
      return;
    }

    setFormError("");
    setVerificationError("");

    try {
      const { error } = await signIn.create({
        identifier: email.trim(),
      });

      if (error) {
        setFormError(getClerkErrorMessage(error, "Could not sign in."));
        return;
      }

      const { error: verificationSendError } =
        await signIn.prepareEmailAddressVerification({
          strategy: "email_code",
        });

      if (verificationSendError) {
        setFormError(
          getClerkErrorMessage(
            verificationSendError,
            "Could not send the verification code.",
          ),
        );
        return;
      }

      setShowVerification(true);
    } catch (error) {
      setFormError(getClerkErrorMessage(error, "Could not sign in."));
    }
  };

  const handleVerify = async (code: string) => {
    setVerificationError("");

    try {
      const { error } = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (error) {
        setVerificationError(
          getClerkErrorMessage(error, "Invalid verification code."),
        );
        return;
      }

      if (signIn.status === "complete") {
        await setActive({ session: signIn.createdSessionId });
        router.replace("/(home)/index");
        return;
      }

      setVerificationError("Verification is incomplete. Please try again.");
    } catch (error) {
      setVerificationError(
        getClerkErrorMessage(error, "Invalid verification code."),
      );
    }
  };

  const handleResendCode = async () => {
    setVerificationError("");

    const { error } = await signIn.prepareEmailAddressVerification({
      strategy: "email_code",
    });

    if (error) {
      setVerificationError(
        getClerkErrorMessage(error, "Could not resend the code."),
      );
    }
  };

  const handleSocialPress = async (provider: SocialProvider) => {
    setSocialProvider(provider);
    setFormError("");

    try {
      const { createdSessionId, setActive: setActiveSSO } = await startSSOFlow({
        strategy: oauthStrategies[provider],
        redirectUrl: "langtrans://oauth-callback",
      });

      if (createdSessionId) {
        await setActiveSSO?.({ session: createdSessionId });
        router.replace("/(home)/index");
      }
    } catch (error) {
      setFormError(getClerkErrorMessage(error, "Social sign in failed."));
    } finally {
      setSocialProvider(null);
    }
  };

  if (isSignedIn || signIn.status === "complete") {
    return null;
  }

  return (
    <>
      <AuthScreen
        email={email}
        emailError={errors.fields.identifier?.message}
        footerActionLabel="Sign Up"
        footerText="Don't have an account?"
        formError={formError || errors.global?.[0]?.message}
        hidePassword
        isSubmitting={fetchStatus === "fetching" || socialProvider !== null}
        onBack={() => router.back()}
        onEmailChange={setEmail}
        onFooterPress={() => router.push("/(auth)/signup")}
        onSocialPress={handleSocialPress}
        onSubmit={handleSubmit}
        submitLabel="Sign In"
        subtitle="Welcome back to your journey"
        title="Welcome back"
      />

      <VerificationModal
        email={email}
        error={verificationError}
        onClose={() => setShowVerification(false)}
        onResend={handleResendCode}
        onVerify={handleVerify}
        visible={showVerification}
      />

      <View nativeID="clerk-captcha" className="h-0 w-0" />
    </>
  );
}
