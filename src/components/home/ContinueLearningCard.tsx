import { images } from "@/constants/images";
import { LANGUAGES } from "@/data/languages";
import { UNITS } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { Image, TouchableOpacity, View } from "react-native";
import { BodyLarge, H3 } from "../Typography";

export const ContinueLearningCard = () => {
  const { selectedLanguage } = useLanguageStore();

  const language = LANGUAGES.find((l) => l.code === selectedLanguage);
  // Find current unit for this language
  const unit =
    UNITS.find((u) => u.languageCode === selectedLanguage) || UNITS[0];

  return (
    <View className="mx-6 mt-6 rounded-4xl bg-lingua-purple overflow-hidden relative">
      <View className="p-6 pr-32">
        <BodyLarge className="text-white/80 font-poppins-medium mb-1">
          Continue learning
        </BodyLarge>
        <H3 className="text-white text-3xl font-poppins-bold mb-1">
          {language?.name || "Spanish"}
        </H3>
        <BodyLarge className="text-white/90 font-poppins-medium mb-6">
          A1 • Unit {unit.order}
        </BodyLarge>

        <TouchableOpacity className="bg-white py-3 px-6 rounded-2xl self-start">
          <BodyLarge className="text-lingua-purple font-poppins-bold">
            Continue
          </BodyLarge>
        </TouchableOpacity>
      </View>

      <Image
        source={images.palace}
        className="absolute right-0 bottom-0 w-44 h-44"
        resizeMode="contain"
      />
    </View>
  );
};
