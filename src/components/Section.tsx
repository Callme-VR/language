import { ReactNode } from "react";
import { Text, View } from "react-native";

type SectionLabelProps = {
  children: ReactNode;
  tone?: "purple" | "blue";
};

export function SectionLabel({ children, tone = "purple" }: SectionLabelProps) {
  const className =
    tone === "blue" ? "brand-section-label-blue" : "brand-section-label";

  return <Text className={className}>{children}</Text>;
}

type SectionProps = {
  label?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ label, children, className = "" }: SectionProps) {
  return (
    <View
      className={`brand-card brand-card-shadow ${className}`}
    >
      {label ? <View className="mb-5">{label}</View> : null}
      <View className="brand-divider mb-5" />
      {children}
    </View>
  );
}
