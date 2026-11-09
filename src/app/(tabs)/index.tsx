import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
import { useRouter } from "expo-router"; // Import the router hook
import TripCard from "../../components/TripCard";
import { TripEvent } from "../../types";

const MOCK_TRIPS: TripEvent[] = [
  {
    id: "1",
    title: "Weekend in Kyoto",
    date: new Date("2026-11-15"),
    notes: "Book Shinkansen tickets beforehand.",
  },
  {
    id: "2",
    title: "Palawan Beach Getaway",
    date: new Date("2026-12-10"),
    notes: "Bring snorkeling gear.",
  },
];

export default function HomeScreen() {
  const router = useRouter(); // Initialize the router

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Upcoming Trips</Text>
      </View>

      <FlatList
        data={MOCK_TRIPS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            trip={item}
            // Push the user to the dynamic route using the item's ID
            onPress={() => router.push(`/trip/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  headerContainer: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1a1a1a" },
  listContent: { paddingBottom: 20 },
});
