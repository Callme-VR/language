import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/languageStore";
import { useLearningStore } from "@/store/learningStore";
import { LANGUAGES } from "@/data/languages";
import { H4 } from "../Typography";
import { images } from "@/constants/images";

export const HomeHeader = () => {
  const { user } = useUser();
  const { selectedLanguage } = useLanguageStore();
  const { streak } = useLearningStore();

  const language = LANGUAGES.find((l) => l.code === selectedLanguage);

  return (
    <View className="flex-row items-center justify-between px-6 py-4">
      <View className="flex-row items-center">
        {language?.flag && (
          <Image
            source={{ uri: language.flag }}
            className="w-10 h-10 rounded-full mr-3"
            resizeMode="cover"
          />
        )}
        <H4 className="font-poppins-semibold">
          Hola, {user?.firstName || "Learner"}! 👋
        </H4>
      </View>

      <View className="flex-row items-center">
        <View className="flex-row items-center mr-4">
          <Image
            source={images.streakFire}
            className="w-6 h-6 mr-1"
            resizeMode="contain"
          />
          <H4 className="font-poppins-semibold text-streak">{streak}</H4>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#001328" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
