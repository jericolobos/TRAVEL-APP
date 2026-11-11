import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import icons for the button
import TripCard from "../../components/TripCard";
import { useTrips } from "../../utils/TripContext";

export default function HomeScreen() {
  const router = useRouter();
  const { trips } = useTrips();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Upcoming Trips</Text>
      </View>

      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            trip={item}
            onPress={() => router.push(`/trip/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push("/add")}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  headerContainer: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1a1a1a" },
  listContent: { paddingBottom: 100 }, // Added extra padding so the FAB doesn't cover the last item
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    backgroundColor: "#2f95dc",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});
