import { Image, Text, View } from "react-native";
import { images } from "@/constants/images";
import { brand } from "@/theme";

type BrandSize = "sm" | "md" | "lg";

const sizes: Record<BrandSize, { mark: number; text: string; gap: number }> = {
  sm: { mark: 32, text: "text-h3", gap: 8 },
  md: { mark: 56, text: "text-brand", gap: 16 },
  lg: { mark: 72, text: "text-brand-lg", gap: 20 },
};

type BrandProps = {
  size?: BrandSize;
  showName?: boolean;
};

export function Brand({ size = "md", showName = true }: BrandProps) {
  const { mark, text, gap } = sizes[size];

  return (
    <View
      className="flex-row items-center"
      style={{ gap }}
    >
      <Image
        source={images.brandMark}
        style={{ width: mark, height: mark }}
        resizeMode="contain"
        accessibilityLabel="langTrans mascot"
      />
      {showName ? (
        <Text className={`${text} text-text-primary`}>{brand.name}</Text>
      ) : null}
    </View>
  );
}
