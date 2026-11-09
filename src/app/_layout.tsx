import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Tab navigation (No header) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Dynamic trip details screen (Standard header with back button) */}
      <Stack.Screen
        name="trip/[id]"
        options={{
          headerBackTitle: "Back", // Clean back button label for iOS
          headerTintColor: "#2f95dc", // Matches your active tab theme
        }}
      />
    </Stack>
  );
}
