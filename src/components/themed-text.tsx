import { Text, type TextProps } from "react-native";

type Props = TextProps & { type?: "title" | "link" | "default" };

export default function ThemedText({ style, type, ...rest }: Props) {
  return <Text style={style} {...rest} />;
}
