import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomMarker() {
  return (
    <View style={styles.markerContainer}>
      <Ionicons name="location" size={24} color="#ffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    backgroundColor: "#2f95dc", // Matches your active tab color
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Shadow for Android
  },
});
