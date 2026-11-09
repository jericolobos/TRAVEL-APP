import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TripEvent } from "../types";

interface TripCardProps {
  trip: TripEvent;
  onPress: () => void;
}

export default function TripCard({ trip, onPress }: TripCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.content}>
        <Text style={styles.title}>{trip.title}</Text>
        <Text style={styles.date}>{trip.date.toLocaleDateString()}</Text>
        {trip.notes && <Text style={styles.notes}>{trip.notes}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: { gap: 4 },
  title: { fontSize: 18, fontWeight: "600", color: "#333" },
  date: { fontSize: 14, color: "#666", marginBottom: 4 },
  notes: { fontSize: 14, color: "#444", fontStyle: "italic" },
});
