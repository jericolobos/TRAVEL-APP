import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* This ensures your (tabs) layout renders without a duplicate header */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
