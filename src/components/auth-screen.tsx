import SocialButton from "@/components/SocialButton";
import { images } from "@/constants/images";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import type { ComponentProps, ReactNode } from "react";
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

export type SocialProvider = "google" | "facebook" | "apple";

type AuthScreenProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  footerText: string;
  footerActionLabel: string;
  email: string;
  password: string;
  showPassword: boolean;
  isSubmitting: boolean;
  formError?: string;
  emailError?: string;
  passwordError?: string;
  onBack: () => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: () => void;
  onFooterPress: () => void;
  onSocialPress: (provider: SocialProvider) => void;
};

const socialButtons: {
  provider: SocialProvider;
  label: string;
  icon: ReactNode;
}[] = [
  {
    provider: "google",
    label: "Continue with Google",
    icon: <AntDesign name="google" size={25} color="#4285F4" />,
  },
  {
    provider: "facebook",
    label: "Continue with Facebook",
    icon: <FontAwesome name="facebook" size={29} color="#1877F2" />,
  },
  {
    provider: "apple",
    label: "Continue with Apple",
    icon: <FontAwesome name="apple" size={30} color="#001328" />,
  },
];

const passwordDots = "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";

export default function AuthScreen({
  title,
  subtitle,
  submitLabel,
  footerText,
  footerActionLabel,
  email,
  password,
  showPassword,
  isSubmitting,
  formError,
  emailError,
  passwordError,
  onBack,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
  onFooterPress,
  onSocialPress,
}: AuthScreenProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        className="px-7"
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          accessibilityLabel="Go back"
          activeOpacity={0.75}
          className="-ml-1 mt-3 h-11 w-11 items-start justify-center"
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          onPress={onBack}
        >
          <Feather name="chevron-left" size={34} color="#001328" />
        </TouchableOpacity>

        <Text className="mt-7 font-poppins-bold text-[30px] leading-9.5 text-text-primary">
          {title}
        </Text>
        <Text className="mt-2 font-poppins text-[16px] leading-6.25 text-text-secondary">
          {subtitle} <Text className="text-streak">{"\u2728"}</Text>
        </Text>

        <View className="relative mt-5 h-39.25 items-center justify-end overflow-visible">
          <Text className="absolute left-23 top-11 font-poppins-bold text-[26px] text-streak">
            {"\u2726"}
          </Text>
          <Text className="absolute right-17 top-12 font-poppins-bold text-[24px] text-info">
            {"\u2726"}
          </Text>
          <Text className="absolute right-20.5 top-22 font-poppins-bold text-[26px] text-warning">
            {"\u2726"}
          </Text>
          <Image
            source={images.mascotAuth}
            className="h-45 w-57.5"
            resizeMode="contain"
          />
        </View>

        <View className="-mt-2 gap-4">
          <AuthField
            autoCapitalize="none"
            autoComplete="email"
            error={emailError}
            keyboardType="email-address"
            label="Email"
            onChangeText={onEmailChange}
            placeholder="alex@gmail.com"
            textContentType="emailAddress"
            value={email}
          />

          <AuthField
            error={passwordError}
            label="Password"
            onChangeText={onPasswordChange}
            placeholder={passwordDots}
            secureTextEntry={!showPassword}
            textContentType="password"
            value={password}
            rightElement={
              <TouchableOpacity
                accessibilityLabel={
                  showPassword ? "Hide password" : "Show password"
                }
                activeOpacity={0.75}
                className="h-10 w-10 items-center justify-center"
                onPress={onTogglePassword}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#6B7280"
                />
              </TouchableOpacity>
            }
          />
        </View>

        {formError ? (
          <Text className="mt-3 font-poppins text-[12px] leading-4.5 text-error">
            {formError}
          </Text>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.85}
          className={`mt-6 h-16 items-center justify-center rounded-[18px] border-b-[3px] border-lingua-deep-purple bg-lingua-purple ${
            isSubmitting ? "opacity-60" : ""
          }`}
          disabled={isSubmitting}
          onPress={onSubmit}
        >
          <Text className="font-poppins-semibold text-[18px] leading-6.5 text-white">
            {isSubmitting ? "Please wait..." : submitLabel}
          </Text>
        </TouchableOpacity>

        <View className="mt-8 flex-row items-center gap-5">
          <View className="h-px flex-1 bg-border" />
          <Text className="font-poppins text-[15px] leading-5.5 text-text-secondary">
            or continue with
          </Text>
          <View className="h-px flex-1 bg-border" />
        </View>

        <View className="mt-6 gap-3">
          {socialButtons.map((button) => (
            <SocialButton
              key={button.provider}
              disabled={isSubmitting}
              icon={button.icon}
              label={button.label}
              onPress={() => onSocialPress(button.provider)}
            />
          ))}
        </View>

        <View className="mt-auto flex-row items-center justify-center gap-1 pb-5 pt-14">
          <Text className="font-poppins text-[15px] leading-5.5 text-text-secondary">
            {footerText}
          </Text>
          <TouchableOpacity activeOpacity={0.75} onPress={onFooterPress}>
            <Text className="font-poppins-semibold text-[15px] leading-5.5 text-lingua-purple">
              {footerActionLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type AuthFieldProps = ComponentProps<typeof TextInput> & {
  label: string;
  error?: string;
  rightElement?: ReactNode;
};

function AuthField({
  label,
  error,
  rightElement,
  ...inputProps
}: AuthFieldProps) {
  return (
    <View>
      <View className="h-20.5 justify-center rounded-[18px] border border-border bg-white px-5">
        <Text className="font-poppins-medium text-[13px] leading-4.5 text-text-secondary">
          {label}
        </Text>
        <View className="mt-2 flex-row items-center">
          <TextInput
            placeholderTextColor="#001328"
            style={styles.input}
            className="flex-1 p-0 font-poppins text-[16px] leading-[24px] text-text-primary"
            {...inputProps}
          />
          {rightElement}
        </View>
      </View>
      {error ? (
        <Text className="mt-2 font-poppins text-[12px] leading-4.5 text-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    lineHeight: 24,
    minHeight: 28,
    padding: 0,
  },
});
