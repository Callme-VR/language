import { useCallback } from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/languageStore";
import { useLearningStore } from "@/store/learningStore";
import { LANGUAGES } from "@/data/languages";
import { UNITS } from "@/data/units";
import { LESSONS } from "@/data/lessons";
import { images } from "@/constants/images";
import { H2, H3, H4, BodySmall, Caption } from "@/components/Typography";
import { LessonCard } from "@/components/lesson/LessonCard";

export default function LearnScreen() {
  const router = useRouter();
  const { selectedLanguage } = useLanguageStore();
  const { completedLessonIds } = useLearningStore();

  const language = LANGUAGES.find((l) => l.code === selectedLanguage);
  const units = UNITS.filter((u) => u.languageCode === selectedLanguage);

  const getLessonStatus = useCallback(
    (lessonId: string) => {
      if (completedLessonIds.includes(lessonId)) return "completed";
      return "available";
    },
    [completedLessonIds],
  );

  const xpEarned = completedLessonIds.reduce((sum, id) => {
    const lesson = LESSONS.find((l) => l.id === id);
    return sum + (lesson?.xpReward ?? 0);
  }, 0);

  const totalXp = LESSONS.filter((l) =>
    units.some((u) => u.lessonIds.includes(l.id)),
  ).reduce((sum, l) => sum + l.xpReward, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <View className="flex-row items-center">
            {language?.flag && (
              <Image
                source={{ uri: language.flag }}
                className="w-10 h-10 rounded-full mr-3"
                resizeMode="cover"
              />
            )}
            <View>
              <H2 className="font-poppins-bold text-[22px]">
                {language?.name || "Language"}
              </H2>
              <Caption className="text-text-secondary font-poppins-medium">
                {language?.nativeName || ""}
              </Caption>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="flex-row items-center bg-surface px-3 py-2 rounded-2xl">
              <Ionicons name="flash" size={16} color="#ff8a00" />
              <Caption className="text-streak ml-1 font-poppins-semibold">
                {xpEarned}/{totalXp} XP
              </Caption>
            </View>
          </View>
        </View>

        {/* Progress overview */}
        <View className="mx-6 mb-6 p-4 rounded-3xl bg-surface flex-row items-center">
          <Image
            source={images.treasure}
            className="w-14 h-14 mr-4"
            resizeMode="contain"
          />
          <View className="flex-1">
            <H4 className="font-poppins-bold text-[16px] mb-0.5">
              Keep it up!
            </H4>
            <BodySmall className="text-text-secondary mb-2">
              {completedLessonIds.length} of{" "}
              {
                units.reduce((sum, u) => sum + u.lessonIds.length, 0)
              }{" "}
              lessons completed
            </BodySmall>
            <View className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full bg-lingua-purple rounded-full"
                style={{
                  width: `${
                    (completedLessonIds.length /
                      Math.max(
                        units.reduce((sum, u) => sum + u.lessonIds.length, 0),
                        1,
                      )) *
                    100
                  }%`,
                }}
              />
            </View>
          </View>
        </View>

        {/* Units & Lessons */}
        {units.map((unit) => {
          const unitLessons = LESSONS.filter((l) =>
            unit.lessonIds.includes(l.id),
          ).sort(
            (a, b) =>
              unit.lessonIds.indexOf(a.id) - unit.lessonIds.indexOf(b.id),
          );

          return (
            <View key={unit.id} className="mb-8">
              {/* Unit Header */}
              <View className="mx-6 mb-4">
                <View className="flex-row items-center mb-1">
                  <View className="w-1 h-6 bg-lingua-purple rounded-full mr-3" />
                  <H3 className="font-poppins-bold text-[18px]">
                    {unit.title}
                  </H3>
                </View>
                <BodySmall className="text-text-secondary ml-7">
                  {unit.description}
                </BodySmall>
              </View>

              {/* Lesson Cards */}
              {unitLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  icon={lesson.icon}
                  title={lesson.title}
                  description={lesson.description}
                  xpReward={lesson.xpReward}
                  status={getLessonStatus(lesson.id) as any}
                  onPress={() => router.push(`/lesson/${lesson.id}`)}
                />
              ))}
            </View>
          );
        })}

        {/* Bottom spacing */}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
