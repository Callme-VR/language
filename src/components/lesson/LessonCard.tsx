import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { H4, Body, BodySmall, Caption } from "../Typography";

export type LessonStatus = "completed" | "in-progress" | "available";

interface LessonCardProps {
  icon: string;
  title: string;
  description: string;
  xpReward: number;
  status: LessonStatus;
  onPress: () => void;
}

const statusConfig = {
  completed: {
    circleBg: "bg-lingua-green",
    border: "border-lingua-green",
    icon: "checkmark-circle",
    iconColor: "#21c16b",
  },
  "in-progress": {
    circleBg: "bg-lingua-purple",
    border: "border-lingua-purple",
    icon: "play-circle",
    iconColor: "#6c4ef5",
  },
  available: {
    circleBg: "bg-gray-200",
    border: "border-gray-300",
    icon: "chevron-forward-circle",
    iconColor: "#d1d5db",
  },
};

export const LessonCard = ({
  icon,
  title,
  description,
  xpReward,
  status,
  onPress,
}: LessonCardProps) => {
  const config = statusConfig[status];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-white mx-6 mb-3 p-4 rounded-3xl border border-border"
      activeOpacity={0.7}
    >
      <View className="w-14 h-14 rounded-2xl bg-surface items-center justify-center mr-4">
        <Body className="text-3xl">{icon}</Body>
      </View>

      <View className="flex-1">
        <H4 className="font-poppins-semibold text-[15px] mb-0.5">
          {title}
        </H4>
        <BodySmall className="text-text-secondary leading-4 mb-1">
          {description}
        </BodySmall>
        <View className="flex-row items-center">
          <Ionicons name="flash" size={12} color="#ff8a00" />
          <Caption className="text-streak ml-0.5 font-poppins-medium">
            +{xpReward} XP
          </Caption>
        </View>
      </View>

      <View className="ml-2">
        {status === "completed" ? (
          <View className="w-8 h-8 rounded-full bg-lingua-green items-center justify-center">
            <Ionicons name="checkmark" size={18} color="white" />
          </View>
        ) : (
          <View
            className={`w-8 h-8 rounded-full border-2 items-center justify-center ${config.border}`}
          >
            <Ionicons
              name={status === "in-progress" ? "play" : "chevron-forward"}
              size={16}
              color={status === "in-progress" ? "#6c4ef5" : "#d1d5db"}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
