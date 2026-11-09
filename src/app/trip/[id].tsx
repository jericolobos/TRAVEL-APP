import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useTrips } from "../../utils/TripContext"; // Import the hook

export default function TripDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trips } = useTrips(); // Pull global state

  // Find the trip from the global state rather than a local mock array
  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Not Found" }} />
        <Text style={styles.errorText}>Trip not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: trip.title }} />

      <View style={styles.card}>
        <Text style={styles.title}>{trip.title}</Text>
        <Text style={styles.date}>{trip.date.toLocaleDateString()}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>Trip Notes</Text>
        <Text style={styles.notes}>{trip.notes || "No notes added yet."}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 8 },
  date: { fontSize: 16, color: "#666", marginBottom: 16 },
  divider: { height: 1, backgroundColor: "#eeeeee", marginVertical: 16 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  notes: { fontSize: 16, color: "#444", lineHeight: 24 },
  errorText: { fontSize: 18, color: "#ff3b30" },
});
