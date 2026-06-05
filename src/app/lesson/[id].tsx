import { useCallback } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LESSONS } from "@/data/lessons";
import { useLearningStore } from "@/store/learningStore";
import { H2, H3, H4, Body, BodySmall, Caption } from "@/components/Typography";

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { completeLesson, addXP, completedLessonIds } = useLearningStore();

  const lesson = LESSONS.find((l) => l.id === id);
  const isCompleted = completedLessonIds.includes(id ?? "");

  const handleComplete = useCallback(() => {
    if (!id) return;
    completeLesson(id);
    addXP(lesson?.xpReward ?? 10);
    router.back();
  }, [id, lesson, completeLesson, addXP, router]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="sad-outline" size={64} color="#d1d5db" />
          <H3 className="mt-4 text-center">Lesson not found</H3>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-6 bg-lingua-purple py-3 px-8 rounded-2xl"
          >
            <Body className="text-white font-poppins-semibold">Go back</Body>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Back button */}
        <View className="px-6 pt-2 pb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-2xl bg-surface items-center justify-center"
          >
            <Ionicons name="chevron-back" size={24} color="#001328" />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View className="items-center px-6 mb-8">
          <View className="w-20 h-20 rounded-3xl bg-surface items-center justify-center mb-4">
            <Body className="text-4xl">{lesson.icon}</Body>
          </View>
          <H2 className="font-poppins-bold text-center mb-2">
            {lesson.title}
          </H2>
          <BodySmall className="text-text-secondary text-center mb-4 leading-5">
            {lesson.description}
          </BodySmall>

          <View className="flex-row items-center bg-orange-50 px-4 py-2 rounded-2xl border border-orange-200">
            <Ionicons name="flash" size={16} color="#ff8a00" />
            <BodySmall className="text-streak ml-1.5 font-poppins-semibold">
              {lesson.xpReward} XP
            </BodySmall>
          </View>
        </View>

        {/* Goals */}
        <View className="px-6 mb-8">
          <H4 className="font-poppins-bold mb-3">Lesson goals</H4>
          {lesson.goals.map((goal, index) => (
            <View key={index} className="flex-row items-center mb-3">
              <View className="w-8 h-8 rounded-full bg-surface items-center justify-center mr-3">
                <Ionicons name="flag-outline" size={16} color="#6c4ef5" />
              </View>
              <View className="flex-1">
                <BodySmall className="font-poppins-medium">
                  {goal.description}
                </BodySmall>
                <Caption className="text-streak">+{goal.xpReward} XP</Caption>
              </View>
            </View>
          ))}
        </View>

        {/* Vocabulary Preview */}
        <View className="px-6 mb-8">
          <H4 className="font-poppins-bold mb-3">Vocabulary</H4>
          {lesson.vocabulary.slice(0, 3).map((v, index) => (
            <View
              key={index}
              className="flex-row items-center mb-2 p-3 rounded-2xl bg-surface"
            >
              <Body className="mr-2 text-xl">{v.emoji}</Body>
              <View className="flex-1">
                <BodySmall className="font-poppins-semibold">
                  {v.word}
                </BodySmall>
                <Caption className="text-text-secondary">
                  {v.translation}
                </Caption>
              </View>
              <Caption className="text-text-secondary italic">
                {v.pronunciation}
              </Caption>
            </View>
          ))}
          {lesson.vocabulary.length > 3 && (
            <Caption className="text-lingua-purple font-poppins-medium text-center mt-1">
              +{lesson.vocabulary.length - 3} more words
            </Caption>
          )}
        </View>

        {/* Phrases Preview */}
        {lesson.phrases.length > 0 && (
          <View className="px-6 mb-8">
            <H4 className="font-poppins-bold mb-3">Key phrases</H4>
            {lesson.phrases.slice(0, 2).map((p, index) => (
              <View key={index} className="mb-2 p-3 rounded-2xl bg-[#F4FAF4]">
                <BodySmall className="font-poppins-semibold">
                  {p.text}
                </BodySmall>
                <Caption className="text-text-secondary">
                  {p.translation}
                </Caption>
              </View>
            ))}
          </View>
        )}

        {/* Complete Button */}
        <View className="px-6 mb-10">
          <TouchableOpacity
            onPress={handleComplete}
            disabled={isCompleted}
            className={`py-4 rounded-3xl items-center ${
              isCompleted ? "bg-lingua-green" : "bg-lingua-purple"
            }`}
          >
            <View className="flex-row items-center">
              {isCompleted ? (
                <Ionicons name="checkmark-circle" size={20} color="white" />
              ) : (
                <Ionicons name="flash" size={20} color="white" />
              )}
              <Body className="text-white font-poppins-bold text-[17px] ml-2">
                {isCompleted
                  ? "Completed!"
                  : `Complete & earn ${lesson.xpReward} XP`}
              </Body>
            </View>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 40,
  },
});
