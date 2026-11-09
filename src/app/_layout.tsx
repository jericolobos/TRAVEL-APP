import { Stack } from "expo-router";
import { TripProvider } from "../utils/TripContext"; // Import the Provider

export default function RootLayout() {
  return (
    // Wrap the entire Stack router in the Provider
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
      </Stack>
    </TripProvider>
  );
}
