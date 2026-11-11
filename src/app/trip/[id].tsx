import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTrips } from "../../utils/TripContext";

export default function TripDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter(); // Initialize router to navigate back after deletion
  const { trips, deleteTrip } = useTrips();

  const trip = trips.find((t) => t.id === id);

  // The delete confirmation dialog
  const handleDelete = () => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to remove this trip from your itinerary?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive", // Renders red on iOS
          onPress: () => {
            deleteTrip(id); // Remove from global state
            router.back(); // Send the user back to the Home screen
          },
        },
      ],
    );
  };

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

      {/* Delete Button Container */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={20} color="#ff3b30" />
        <Text style={styles.deleteText}>Delete Trip</Text>
      </TouchableOpacity>
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

  // New styles for the delete button
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    padding: 16,
    backgroundColor: "#ffebe9",
    borderRadius: 8,
    gap: 8,
  },
  deleteText: {
    color: "#ff3b30",
    fontSize: 16,
    fontWeight: "600",
  },
});
