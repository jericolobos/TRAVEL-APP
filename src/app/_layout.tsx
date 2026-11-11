import { Stack } from "expo-router";
import { TripProvider } from "../utils/TripContext";

export default function RootLayout() {
  return (
    <TripProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="trip/[id]"
          options={{
            headerBackTitle: "Back",
            headerTintColor: "#2f95dc",
          }}
        />
        {/* Register the new modal screen */}
        <Stack.Screen
          name="add"
          options={{
            presentation: "modal",
            title: "Add New Trip",
            headerTintColor: "#2f95dc",
          }}
        />
      </Stack>
    </TripProvider>
  );
}
