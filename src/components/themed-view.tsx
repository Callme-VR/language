import { View, type ViewProps } from "react-native";

export default function ThemedView({ style, ...rest }: ViewProps) {
  return <View style={style} {...rest} />;
}
