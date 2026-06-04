export const fonts = {
  poppins: {
    regular: "Poppins-Regular",
    medium: "Poppins-Medium",
    semibold: "Poppins-SemiBold",
    bold: "Poppins-Bold",
  },
} as const;

export const fontFamily = {
  regular: fonts.poppins.regular,
  medium: fonts.poppins.medium,
  semibold: fonts.poppins.semibold,
  bold: fonts.poppins.bold,
} as const;

export type Fonts = typeof fonts;
