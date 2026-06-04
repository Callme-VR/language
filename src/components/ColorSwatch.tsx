import { Text, View } from "react-native";

type ColorSwatchProps = {
  color: string;
  name: string;
  hex: string;
};

export function ColorSwatch({ color, name, hex }: ColorSwatchProps) {
  return (
    <View className="flex-1">
      <View
        className="brand-swatch"
        style={{ backgroundColor: color }}
      />
      <View className="brand-swatch-meta">
        <Text className="brand-swatch-name">{name}</Text>
        <Text className="brand-swatch-hex">{hex}</Text>
      </View>
    </View>
  );
}
