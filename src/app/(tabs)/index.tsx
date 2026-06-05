import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader } from "@/components/home/HomeHeader";
import { DailyGoalCard } from "@/components/home/DailyGoalCard";
import { ContinueLearningCard } from "@/components/home/ContinueLearningCard";
import { TodaysPlan } from "@/components/home/TodaysPlan";
import { NextUpCard } from "@/components/home/NextUpCard";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeHeader />
        <DailyGoalCard />
        <ContinueLearningCard />
        <TodaysPlan />
        <NextUpCard />
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
