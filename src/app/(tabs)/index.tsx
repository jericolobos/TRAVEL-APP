import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
import { useRouter } from "expo-router";
import TripCard from "../../components/TripCard";
import { useTrips } from "../../utils/TripContext"; // Import the hook

export default function HomeScreen() {
  const router = useRouter();
  const { trips } = useTrips(); // Pull global state instead of local mock data

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Upcoming Trips</Text>
      </View>

      <FlatList
        // Feed the global state to the FlatList
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  headerContainer: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1a1a1a" },
  listContent: { paddingBottom: 20 },
});
