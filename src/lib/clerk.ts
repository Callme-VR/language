import { tokenCache } from "@clerk/expo/token-cache";

export { tokenCache };

type ClerkErrorLike = {
  errors?: { message?: string; longMessage?: string }[];
  message?: string;
  longMessage?: string;
};

export function getClerkErrorMessage(error: unknown, fallback: string) {
  if (typeof error !== "object" || error === null) {
    return fallback;
  }

  const clerkError = error as ClerkErrorLike;
  const firstError = clerkError.errors?.[0];

  return (
    firstError?.longMessage ??
    firstError?.message ??
    clerkError.longMessage ??
    clerkError.message ??
    fallback
  );
}
