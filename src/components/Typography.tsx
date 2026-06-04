import { ReactNode } from "react";
import { Text, TextProps } from "react-native";

type TypographyProps = TextProps & {
  children: ReactNode;
  className?: string;
};

function createTypography(variant: string) {
  return function Typography({ children, className = "", ...rest }: TypographyProps) {
    return (
      <Text className={`text-${variant} ${className}`} {...rest}>
        {children}
      </Text>
    );
  };
}

export const H1 = createTypography("h1");
export const H2 = createTypography("h2");
export const H3 = createTypography("h3");
export const H4 = createTypography("h4");
export const BodyLarge = createTypography("body-lg");
export const Body = createTypography("body");
export const BodySmall = createTypography("body-sm");
export const Caption = createTypography("caption");
