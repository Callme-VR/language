import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { H4, BodySmall, Body } from "../Typography";

export const NextUpCard = () => {
  return (
    <View className="mx-6 mt-8 mb-10 p-6 rounded-[32px] bg-[#F4FAF4] flex-row items-center border border-[#E8F5E8]">
      <View className="flex-1">
        <BodySmall className="text-text-secondary font-poppins-medium mb-1">
          Next up
        </BodySmall>
        <H4 className="font-poppins-bold text-[20px] mb-1">AI Video Call</H4>
        <Body className="text-text-secondary">Practice speaking</Body>
      </View>

      <View className="flex-row items-center">
        <View className="relative">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=teacher" }}
            className="w-16 h-16 rounded-full border-4 border-white"
          />
          <View className="absolute -right-2 bottom-0 bg-lingua-green w-10 h-10 rounded-full items-center justify-center border-4 border-white">
            <Ionicons name="videocam" size={18} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
};
