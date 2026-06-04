import brandMark from "@/assets/assets/images/moscot-logo.png";
import mascotWelcome from "@/assets/assets/images/mascot-welcome.png";
import mascotAuth from "@/assets/assets/images/mascot-auth.png";
import streakFire from "@/assets/assets/images/streak-fire.png";
import treasure from "@/assets/assets/images/treasure.png";
import palace from "@/assets/assets/images/palace.png";
import earth from "@/assets/assets/images/earth.png";

export const images = {
  brandMark,
  mascotWelcome,
  mascotAuth,
  mascotLogo: brandMark,
  streakFire,
  treasure,
  palace,
  earth,
};

export type ImageKey = keyof typeof images;
