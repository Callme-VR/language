import AuthScreen, { type SocialProvider } from "@/components/auth-screen";
import VerificationModal from "@/components/VerificationModal";
import { getClerkErrorMessage } from "@/lib/clerk";
import { useAuth, useSignIn, useSSO } from "@clerk/expo";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const HOME_ROUTE = "/(tabs)" as const;
const OAUTH_REDIRECT_URL = "langtrans://oauth-callback";

const oauthStrategies = {
  google: "oauth_google",
} as const;

export default function SignInScreen() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
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
      router.replace(HOME_ROUTE);
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
      const emailAddress = email.trim();
      const { error } = await signIn.create({
        identifier: emailAddress,
      });

      if (error) {
        setFormError(getClerkErrorMessage(error, "Could not sign in."));
        return;
      }

      const { error: verificationSendError } = await signIn.emailCode.sendCode({
        emailAddress,
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
      const { error } = await signIn.emailCode.verifyCode({
        code,
      });

      if (error) {
        setVerificationError(
          getClerkErrorMessage(error, "Invalid verification code."),
        );
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ session }) => {
            if (session?.currentTask) {
              setVerificationError(
                "Your account needs one more step before you can continue.",
              );
              return;
            }

            setShowVerification(false);
            router.replace(HOME_ROUTE);
          },
        });
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

    const { error } = await signIn.emailCode.sendCode();

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
        redirectUrl: OAUTH_REDIRECT_URL,
      });

      if (createdSessionId) {
        await setActiveSSO?.({ session: createdSessionId });
        router.replace(HOME_ROUTE);
      } else {
        setFormError("Google sign in did not complete. Please try again.");
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
