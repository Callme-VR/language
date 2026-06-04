import AuthScreen, { type SocialProvider } from "@/components/auth-screen";
import VerificationModal from "@/components/VerificationModal";
import { getClerkErrorMessage } from "@/lib/clerk";
import { useAuth, useSignUp, useSSO } from "@clerk/expo";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const oauthStrategies = {
  google: "oauth_google",
  facebook: "oauth_facebook",
  apple: "oauth_apple",
} as const;

export default function SignUpScreen() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { signUp, errors, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [formError, setFormError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [socialProvider, setSocialProvider] = useState<SocialProvider | null>(
    null,
  );

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, router]);

  const finishSignUp = async () => {
    await signUp.finalize({
      navigate: ({ session }) => {
        if (session?.currentTask) {
          setFormError("Please complete your remaining account setup.");
          return;
        }

        router.replace("/");
      },
    });
  };

  const handleSubmit = async () => {
    if (!email.trim() || !password) {
      setFormError("Enter your email and password to continue.");
      return;
    }

    setFormError("");
    setVerificationError("");

    try {
      const { error } = await signUp.password({
        emailAddress: email.trim(),
        password,
      });

      if (error) {
        setFormError(getClerkErrorMessage(error, "Could not create account."));
        return;
      }

      const { error: verificationSendError } =
        await signUp.verifications.sendEmailCode();

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
      setFormError(getClerkErrorMessage(error, "Could not create account."));
    }
  };

  const handleVerify = async (code: string) => {
    setVerificationError("");

    try {
      const { error } = await signUp.verifications.verifyEmailCode({ code });

      if (error) {
        setVerificationError(
          getClerkErrorMessage(error, "Invalid verification code."),
        );
        return;
      }

      if (signUp.status === "complete") {
        await finishSignUp();
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

    const { error } = await signUp.verifications.sendEmailCode();

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
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: oauthStrategies[provider],
        redirectUrl: "langtrans://oauth-callback",
      });

      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
        router.replace("/");
      }
    } catch (error) {
      setFormError(getClerkErrorMessage(error, "Social sign up failed."));
    } finally {
      setSocialProvider(null);
    }
  };

  if (isSignedIn || signUp.status === "complete") {
    return null;
  }

  return (
    <>
      <AuthScreen
        email={email}
        emailError={errors.fields.emailAddress?.message}
        footerActionLabel="Log In"
        footerText="Already have an account?"
        formError={formError || errors.global?.[0]?.message}
        isSubmitting={fetchStatus === "fetching" || socialProvider !== null}
        onBack={() => router.back()}
        onEmailChange={setEmail}
        onFooterPress={() => router.push("/(auth)/signin")}
        onPasswordChange={setPassword}
        onSocialPress={handleSocialPress}
        onSubmit={handleSubmit}
        onTogglePassword={() => setShowPassword((current) => !current)}
        password={password}
        passwordError={errors.fields.password?.message}
        showPassword={showPassword}
        submitLabel="Sign Up"
        subtitle="Start your language journey today"
        title="Create your account"
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
