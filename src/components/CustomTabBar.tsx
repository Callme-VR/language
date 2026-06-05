import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";

const { width } = Dimensions.get("window");
const TAB_BAR_WIDTH = width;
const TAB_WIDTH = TAB_BAR_WIDTH / 5;

const icons: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  index: { active: "home", inactive: "home-outline" },
  learn: { active: "book", inactive: "book-outline" },
  "ai-teacher": { active: "school", inactive: "school-outline" },
  chat: { active: "chatbubbles", inactive: "chatbubbles-outline" },
  profile: { active: "person", inactive: "person-outline" },
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const translateX = useSharedValue(state.index * TAB_WIDTH);

  useEffect(() => {
    translateX.value = withSpring(state.index * TAB_WIDTH, {
      damping: 20,
      stiffness: 150,
    });
  }, [state.index]);

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View className="flex-row bg-white h-[85px] border-t border-gray-100 items-center justify-around pb-6 px-2">
      {/* Animated Indicator Circle */}
      <Animated.View
        style={[
          animatedCircleStyle,
          {
            position: "absolute",
            width: TAB_WIDTH,
            alignItems: "center",
            justifyContent: "center",
            top: 12, // Align with the icons
          },
        ]}
      >
        <View className="w-12 h-12 rounded-full bg-lingua-purple shadow-lg shadow-lingua-purple/30" />
      </Animated.View>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className="items-center justify-center flex-1"
            activeOpacity={0.7}
          >
            <View className="items-center justify-center h-12 w-full mt-2">
              <Ionicons
                name={isFocused ? icons[route.name].active : icons[route.name].inactive}
                size={24}
                color={isFocused ? "#FFFFFF" : "#9CA3AF"}
              />
              {!isFocused && (
                <Text className="text-[11px] font-poppins-medium text-gray-400 mt-1">
                  {label}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
