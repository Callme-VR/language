import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { H3, Body, BodySmall } from "../Typography";

const PlanItem = ({
  icon,
  iconBg,
  title,
  subtitle,
  completed,
}: {
  icon: string;
  iconBg: string;
  title: string;
  subtitle: string;
  completed: boolean;
}) => (
  <TouchableOpacity className="flex-row items-center mb-5">
    <View className={`${iconBg} w-12 h-12 rounded-2xl items-center justify-center mr-4`}>
      <Ionicons name={icon as any} size={24} color="white" />
    </View>
    <View className="flex-1">
      <Body className="font-poppins-semibold text-[17px]">{title}</Body>
      <BodySmall className="text-text-secondary">{subtitle}</BodySmall>
    </View>
    <View
      className={`w-7 h-7 rounded-full border-2 items-center justify-center ${
        completed ? "bg-lingua-purple border-lingua-purple" : "border-gray-300"
      }`}
    >
      {completed && <Ionicons name="checkmark" size={16} color="white" />}
    </View>
  </TouchableOpacity>
);

export const TodaysPlan = () => {
  return (
    <View className="px-6 mt-8">
      <View className="flex-row items-center justify-between mb-6">
        <H3 className="font-poppins-bold">Today&apos;s plan</H3>
        <TouchableOpacity>
          <Body className="text-lingua-purple font-poppins-semibold">View all</Body>
        </TouchableOpacity>
      </View>

      <PlanItem
        icon="book"
        iconBg="bg-lingua-purple"
        title="Lesson"
        subtitle="At the café"
        completed={true}
      />
      <PlanItem
        icon="headset"
        iconBg="bg-lingua-blue"
        title="AI Conversation"
        subtitle="Talk about your day"
        completed={false}
      />
      <PlanItem
        icon="chatbubble-ellipses"
        iconBg="bg-rose-400"
        title="New words"
        subtitle="10 words"
        completed={false}
      />
    </View>
  );
};
