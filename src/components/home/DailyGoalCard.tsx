import { images } from "@/constants/images";
import { useLearningStore } from "@/store/learningStore";
import { Image, View } from "react-native";
import { BodyLarge, BodySmall, H4 } from "../Typography";

export const DailyGoalCard = () => {
  const { xpToday, dailyGoal } = useLearningStore();
  const progress = Math.min(xpToday / dailyGoal, 1);

  return (
    <View className="mx-6 mt-4 p-5 rounded-3xl bg-[#FFF9F0] flex-row items-center justify-between border border-[#FFE8CC]">
      <View className="flex-1">
        <BodySmall className="text-text-secondary font-poppins-medium mb-1">
          Daily goal
        </BodySmall>
        <View className="flex-row items-baseline mb-3">
          <H4 className="font-poppins-bold text-2xl mr-1">{xpToday}</H4>
          <BodyLarge className="text-text-secondary">
            / {dailyGoal} XP
          </BodyLarge>
        </View>

        {/* Progress Bar */}
        <View className="h-2 w-full bg-[#FFE8CC] rounded-full overflow-hidden">
          <View
            className="h-full bg-streak"
            style={{ width: `${progress * 100}%` }}
          />
        </View>
      </View>

      <Image
        source={images.treasure}
        className="w-20 h-20 ml-4"
        resizeMode="contain"
      />
    </View>
  );
};
