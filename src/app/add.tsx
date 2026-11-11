import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useTrips } from "../utils/TripContext";

export default function AddTripScreen() {
  const router = useRouter();
  const { addTrip } = useTrips();

  // Local state to hold the user's input before saving
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    // Basic validation to prevent saving an empty trip
    if (title.trim() === "") return;

    const newTrip = {
      id: Date.now().toString(), // Generates a unique ID based on the exact current time
      title: title,
      date: new Date(), // Defaults to today; you can add a date picker library later
      notes: notes,
    };

    addTrip(newTrip); // Send to global state
    router.back(); // Dismiss the modal and return to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Trip Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Summer in Tokyo"
        value={title}
        onChangeText={setTitle}
        autoFocus
      />

      <Text style={styles.label}>Notes & Reminders</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Flights booked, need to check hotel..."
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={[styles.button, title.trim() === "" && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={title.trim() === ""}
      >
        <Text style={styles.buttonText}>Save Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  button: {
    backgroundColor: "#2f95dc",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
  buttonDisabled: { backgroundColor: "#a0c4df" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
