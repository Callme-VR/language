import { TextStyle } from "react-native";

export const typography = {
  h1: {
    fontSize: 32,
    lineHeight: 32 * 1.2,
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
  },
  h2: {
    fontSize: 24,
    lineHeight: 24 * 1.3,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
  },
  h3: {
    fontSize: 20,
    lineHeight: 20 * 1.3,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
  },
  h4: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 16 * 1.6,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 14 * 1.6,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
  },
  bodySmall: {
    fontSize: 13,
    lineHeight: 13 * 1.6,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
  },
  caption: {
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
