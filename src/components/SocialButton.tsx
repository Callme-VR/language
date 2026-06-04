import type { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  icon: ReactNode;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
}

export default function SocialButton({
  icon,
  label,
  onPress,
  disabled,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      className={`h-14.5 flex-row items-center rounded-[18px] border border-border bg-white px-5 ${
        disabled ? "opacity-60" : ""
      }`}
      disabled={disabled}
      onPress={onPress}
    >
      <View className="w-9 items-center">{icon}</View>
      <Text className="flex-1 pr-9 text-center font-poppins-medium text-[16px] leading-5.5 text-text-primary">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
